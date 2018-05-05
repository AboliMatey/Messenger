package answers_ans

import (
	"fmt"
	"encoding/json"
	"io/ioutil"
	"testing"
)

func Movie(t *testing.T) {
	session := dao.MgoSession.Clone()
	defer session.Close()

	clctn := session.DB("movies").C("movies_detail")

	plan, _ := ioutil.ReadFile(movies.json)
	var data interface{}
	err := json.Unmarshal(plan, &data)

	db.movies.insert(clctn)
	
}
