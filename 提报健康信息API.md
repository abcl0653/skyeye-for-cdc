# 提报健康信息 API

可以将repo拉到本地跑起来，下面的URL都是指本地服务器

## 获取人员信息

url: <http://localhost:4004/dcp/Person?$expand=TYPE,BLOCK($select=NAME),STATEMENT>

method: GET

Response body:
```json
{
    "@odata.context": "$metadata#Person",
    "value": [
        {
            "createdAt": "2020-03-06T05:15:30.961Z",
            "createdBy": "anonymous",
            "modifiedAt": "2020-03-06T05:15:30.961Z",
            "modifiedBy": "anonymous",
            "ID": "98e231aa-4ca5-4a07-8827-631c720433d8",
            "IDENTIFIER": "335132199033332347",
            "FIRST_NAME": null,
            "LAST_NAME": "蔡小绿",
            "MOBILE_PHONE": "13939213111",
            "HOME_TOWN_1": "xx省",
            "HOME_TOWN_2": "xx市",
            "HOME_TOWN_3": "xx县",
            "EXTERNAL_ID": "weixin number",
            "ADDRESS": "上海市xx区四二路42弄42室",
            "SEX": null,
            "AGE": null,
            "LAT_LNG": null,
            "TYPE_CODE": "PBLC",
            "BLOCK_ID": "a4202bef-ab7e-4806-a131-cee458fe04b9"
        }
    ]
}
```

## 填报健康信息

url: <http://localhost:4004/dcp/newStatementPerson>

method: POST

Request body
```json
{
    "p": {
        "IDENTIFIER": "335132199033332347",
        "MOBILE_PHONE": "13939213111",
        "LAST_NAME": "蔡小绿",
        "BLOCK_ID": "a4202bef-ab7e-4806-a131-cee458fe04b9",
        "EXTERNAL_ID": "weixin number",
        "HOME_TOWN_1":"xx省",
        "HOME_TOWN_2":"xx市",
        "HOME_TOWN_3":"xx县",
        "ADDRESS":"上海市xx区四二路42弄42室"
    },
    "s": {
    	"HEALTH_STATUS_CODE":"HOME",
    	"SYMPTOM_1":false,
    	"SYMPTOM_2":false,
    	"SYMPTOM_3":false,
    	"SYMPTOM_4":true,
    	"SYMPTOM_4_DESC":"感冒，拉肚子，流鼻涕",
    	"IS_OUT": true,
    	"OUT_DESC":"前往菜市场买菜",
    	"QUESTION_1":false,
    	"QUESTION_2":false,
    	"QUESTION_3":false,
    	"REMARK": "没有其他情况了",
    	"SUBMIT_DATE":"2020-03-05"
    	
    }
}
```

提报成功后可以在下面的API中看到详细情况：

URL： <http://localhost:4004/dcp/Person?$expand=TYPE,BLOCK($select=NAME),STATEMENT>

method: GET

response body
```json
{
    "@odata.context": "$metadata#Person(TYPE(),BLOCK(NAME,ID),STATEMENT())",
    "value": [
        {
            "createdAt": "2020-03-06T05:15:30.961Z",
            "createdBy": "anonymous",
            "modifiedAt": "2020-03-06T05:15:30.961Z",
            "modifiedBy": "anonymous",
            "ID": "98e231aa-4ca5-4a07-8827-631c720433d8",
            "IDENTIFIER": "335132199033332347",
            "FIRST_NAME": null,
            "LAST_NAME": "蔡小绿",
            "MOBILE_PHONE": "13939213111",
            "HOME_TOWN_1": "xx省",
            "HOME_TOWN_2": "xx市",
            "HOME_TOWN_3": "xx县",
            "EXTERNAL_ID": "weixin number",
            "ADDRESS": "上海市xx区四二路42弄42室",
            "SEX": null,
            "AGE": null,
            "LAT_LNG": null,
            "TYPE_CODE": "PBLC",
            "BLOCK_ID": "a4202bef-ab7e-4806-a131-cee458fe04b9",
            "TYPE": {
                "name": "Public",
                "descr": null,
                "CODE": "PBLC"
            },
            "BLOCK": {
                "ID": "a4202bef-ab7e-4806-a131-cee458fe04b9",
                "NAME": "张江镇"
            },
            "STATEMENT": [
                {
                    "createdAt": "2020-03-06T05:15:40.719Z",
                    "createdBy": "anonymous",
                    "modifiedAt": "2020-03-06T05:15:40.719Z",
                    "modifiedBy": "anonymous",
                    "ID": "52f8c729-b3ad-4c89-a0f0-b2ef8c0dc0f4",
                    "SYMPTOM_1": false,
                    "SYMPTOM_2": false,
                    "SYMPTOM_3": false,
                    "SYMPTOM_4": true,
                    "SYMPTOM_4_DESC": "感冒，拉肚子，流鼻涕",
                    "IS_OUT": true,
                    "OUT_DESC": "前往菜市场买菜",
                    "QUESTION_1": false,
                    "QUESTION_2": false,
                    "QUESTION_3": false,
                    "REMARK": "没有其他情况了",
                    "SUBMIT_DATE": "2020-03-05",
                    "PERSON_ID": "98e231aa-4ca5-4a07-8827-631c720433d8",
                    "BLOCK_ID": "a4202bef-ab7e-4806-a131-cee458fe04b9",
                    "HEALTH_STATUS_CODE": "HOME"
                },
                {
                    "createdAt": "2020-03-06T05:15:30.963Z",
                    "createdBy": "anonymous",
                    "modifiedAt": "2020-03-06T05:15:30.963Z",
                    "modifiedBy": "anonymous",
                    "ID": "ff03ad57-2998-4607-9de0-dfb970cb3262",
                    "SYMPTOM_1": false,
                    "SYMPTOM_2": false,
                    "SYMPTOM_3": false,
                    "SYMPTOM_4": true,
                    "SYMPTOM_4_DESC": "感冒，拉肚子，流鼻涕",
                    "IS_OUT": true,
                    "OUT_DESC": "前往菜市场买菜",
                    "QUESTION_1": false,
                    "QUESTION_2": false,
                    "QUESTION_3": false,
                    "REMARK": "没有其他情况了",
                    "SUBMIT_DATE": "2020-03-06",
                    "PERSON_ID": "98e231aa-4ca5-4a07-8827-631c720433d8",
                    "BLOCK_ID": "a4202bef-ab7e-4806-a131-cee458fe04b9",
                    "HEALTH_STATUS_CODE": "HOME"
                }
            ]
        }
    ]
}
```
