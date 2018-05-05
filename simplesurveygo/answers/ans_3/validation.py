from jsonschema import validate

schema = {
    "colors": [
		    {
		      "color": "black",
		      "category": "hue",
		      "type": "primary",
		      "code": {
		        "rgba": [255,255,255,1],
		        "hex": "#000"
		        }
		    },
		    {
		      "color": "white",
		      "category": "value",
		      "code": {
		        "rgba": [0,0,0,1],
		        "hex": "#FFF"
		        }
		    },
		    {
		      "color": "red",
		      "category": "hue",
		      "type": "primary",
		      "code": {
		        "rgba": [255,0,0,1],
		        "hex": "#FF0"
		      }
		    }
		  ]
}

def validate_schema (payload):
    try:
        validate(payload,schema)
        return True
    except:
        return False
