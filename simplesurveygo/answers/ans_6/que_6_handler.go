package servicehandlers

import (
	"fmt"
	"net/http"
	"simplesurveygo/answers/ans_6/dao"
)


type DeactiveSurvayHandler struct {
}

func (p DeactiveSurvayHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	response := methodRouter(p, w, r)
	response.(SrvcRes).RenderResponse(w)
}

func (p DeactiveSurvayHandler) Get(r *http.Request) SrvcRes {
	tokens, _ := r.URL.Query()["Token"]

	token := tokens[0]
	user := dao.GetSessionDetails(token)
	if reflect.DeepEqual(user,dao.UserCredentials{}) {
		return SimpleBadRequest("Login Again")
	}else{
		surveys := dao.GetDeactiveSurveys()
		return Response200OK(surveys)
	}
}

func (p DeactiveSurvayHandler) Put(r *http.Request) SrvcRes {
	return ResponseNotImplemented()
}

func (p DeactiveSurvayHandler) Post(r *http.Request) SrvcRes {
	return ResponseNotImplemented()
}
