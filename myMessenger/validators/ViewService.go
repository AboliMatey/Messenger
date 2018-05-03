package validators

import (
	"myMessenger/dao"
	"gopkg.in/mgo.v2/bson"
	"reflect"
)


func Validate_for_delete_msg_from_view(t dao.View_update_struct) bool {
	msg := dao.Get_msg_by_id(t.Msg_id)
	if msg.Sender == bson.ObjectIdHex(t.Cont_id) {
		return true
	}else{
		return false
	}
}


func Validate_for_contacts(sid string,oid string) bool {
	self_info := dao.Get_contact_by_id(sid)
	other_info := dao.Get_contact_by_id(oid)
	if (!reflect.DeepEqual(self_info, (dao.User_contect{})) && !reflect.DeepEqual(other_info, (dao.User_contect{}))){
		for _,v := range self_info.Sviews {
			if v.Cont_id == bson.ObjectIdHex(oid) {
				return false
			} 
		}
		return true
	} else {
		return false
	}
}