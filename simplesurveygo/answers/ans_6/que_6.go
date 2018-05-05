package dao

import (
	"fmt"
	"gopkg.in/mgo.v2/bson"
) 

type Question struct {
	QuestionString string   `json:"questionString" bson:"questionString"`
	Options        []string `json:"options" bson:"options"`
}

type Answer struct {
	Question Question `json:"question" bson:"question"`
	Answer   string   `json:"answer" bson:"answer"`
}

type Survey struct {
	SurveyName  string     `json:"surveyName" bson:"surveyName"`
	Heading     string     `json:"heading" bson:"heading"`
	Description string     `json:"description" bson:"description"`
	Questions   []Question `json:"questions" bson:"questions"`
	Status      bool       `json:"status" bson:"status"`
}

type Survey_expired struct {
	SurveyName 	string 		`json:"surveyName" bson:"surveyName"`
	Heading 	string 	  	`json:"heading" bson:"heading"`
	Status      bool        `json:"status" bson:"status"`
	Surveymonth string  	`json:"surveyMonth" bson:"surveyMonth"`

}

type Session struct {
	Username string `json:"username"`
	Token    string `json:"token"`
}

func GetDeactiveSurveys() interface{} {
	session := MgoSession.Clone()
	defer session.Close()

	var response []interface{}
	clctn := session.DB("simplesurveys").C("survey")
	query := clctn.Find(bson.M{"surveyMonth": surveyMonth})
	err := query.All(&response)

	if err != nil {
		return nil
	} else {
		return response
	}
}

func GetSessionDetails(token string) UserCredentials {
	session := MgoSession.Clone()
	defer session.Close()

	var response Session
	sessionClctn := session.DB("simplesurveys").C("session")
	query := sessionClctn.Find(bson.M{"token": token})
	err := query.One(&response)
	if err != nil {
		return UserCredentials{}
	}

	var cred UserCredentials
	clctn := session.DB("simplesurveys").C("user")
	query = clctn.Find(bson.M{"username": response.Username})
	err = query.One(&cred)
	return cred
}
