jQuery.sap.declare("sap.ibso.skyeyeForCdc.component.test.Component");
sap.ui.getCore().loadLibrary("sap.ui.generic.app");
jQuery.sap.require("sap.ui.generic.app.AppComponent");

// monkey patch to avoid problems with data loading when using a url on top of a 1-1 relationship
jQuery.sap.require("sap.suite.ui.generic.template.js.AnnotationHelper");
sap.suite.ui.generic.template.js.AnnotationHelper.createP13N = function(oContextSet, oContextProp, oDataField) {
	var sP13N = "",
		aAdditionalProperties = [],
		sNavigation = "";
	if (oDataField.Value.Path) {
		sP13N = '\\{"columnKey":"' + oDataField.Value.Path + '", "leadingProperty":"' + oDataField.Value.Path;
		// get Navigation Prefix
		var oMetaModel = this.getModel("meta");
		if (oMetaModel) {
			var oEntityType = oMetaModel.getODataEntityType(oContextSet.entityType);
			if (oEntityType) {
				sNavigation = sap.suite.ui.generic.template.js.AnnotationHelper._getNavigationPrefix(oMetaModel, oEntityType, oDataField.Value.Path);
				if (sNavigation) {
					sNavigation = sNavigation + "/";
				}
			}
		}
	} else if (oDataField.Value.Apply && oDataField.Value.Apply.Name === "odata.concat") {
		oDataField.Value.Apply.Parameters.forEach(function(oParameter) {
			if (oParameter.Type === "Path") {
				if (!sP13N) {
					sP13N = '\\{"columnKey":"' + oParameter.Value + '", "leadingProperty":"' + oParameter.Value;
				} else {
					aAdditionalProperties.push(oParameter.Value);
				}
			}
		});
	}
	if ((oContextProp.type === "Edm.DateTime") && (oContextProp["sap:display-format"] === "Date")) {
		sP13N += '", "type":"date';
	}
	if (oDataField.Criticality && oDataField.Criticality.Path) {
		aAdditionalProperties.push(oDataField.Criticality.Path);
	}
	if (oContextProp["com.sap.vocabularies.Common.v1.Text"] && oContextProp["com.sap.vocabularies.Common.v1.Text"].Path) {
		aAdditionalProperties.push(sNavigation + oContextProp["com.sap.vocabularies.Common.v1.Text"].Path);
	}
	if (oContextProp["Org.OData.Measures.V1.ISOCurrency"] && oContextProp["Org.OData.Measures.V1.ISOCurrency"].Path) {
		aAdditionalProperties.push(sNavigation + oContextProp["Org.OData.Measures.V1.ISOCurrency"].Path);
	}
	if (oContextProp["Org.OData.Measures.V1.Unit"] && oContextProp["Org.OData.Measures.V1.Unit"].Path) {
		aAdditionalProperties.push(sNavigation + oContextProp["Org.OData.Measures.V1.Unit"].Path);
	}
	if (oContextProp["com.sap.vocabularies.Common.v1.FieldControl"] && oContextProp["com.sap.vocabularies.Common.v1.FieldControl"].Path) {
		aAdditionalProperties.push(sNavigation + oContextProp["com.sap.vocabularies.Common.v1.FieldControl"].Path);
	}
	if ((oDataField["RecordType"] === "com.sap.vocabularies.UI.v1.DataFieldWithUrl") && oDataField.Url && oDataField.Url.Apply && oDataField.Url.Apply.Parameters) {
		oDataField.Url.Apply.Parameters.forEach(function(oParameter) {
			if (oParameter.Type === "LabeledElement") {
				aAdditionalProperties.push(oParameter.Value.Path);
			}
		});
	}
	if ((oDataField["RecordType"] === "com.sap.vocabularies.UI.v1.DataFieldWithUrl") && oDataField.Url && oDataField.Url.Path) {
		aAdditionalProperties.push(oDataField.Url.Path);
	}
	if (aAdditionalProperties.length > 0) {
		var sAdditionalProperties = "";
		aAdditionalProperties.forEach(function(oProperty) {
			if (sAdditionalProperties) {
				sAdditionalProperties = sAdditionalProperties + ",";
			}
			sAdditionalProperties = sAdditionalProperties + oProperty;
		});
		sP13N += '", "additionalProperty":"' + sAdditionalProperties;
	}
	var bNotSortable = false;
	if (oContextSet["Org.OData.Capabilities.V1.SortRestrictions"] && oContextSet["Org.OData.Capabilities.V1.SortRestrictions"].NonSortableProperties) {
		var aNonSortableProperties = oContextSet["Org.OData.Capabilities.V1.SortRestrictions"].NonSortableProperties;
		for (var i = aNonSortableProperties.length - 1; i >= 0; i--) {
			if (aNonSortableProperties[i].PropertyPath === oDataField.Value.Path) {
				bNotSortable = true;
				break;
			}
		}
	}
	if (!bNotSortable) {
		if (sNavigation) {
			sP13N += '", "sortProperty":"' + sNavigation + oContextProp.name;
		} else {
			sP13N += '", "sortProperty":"' + oContextProp.name;
		}
	}
	var bNotFilterable = false;
	if (oContextSet["Org.OData.Capabilities.V1.FilterRestrictions"]) {
		if (oContextSet["Org.OData.Capabilities.V1.FilterRestrictions"].Filterable !== 'false') {
			if (oContextSet["Org.OData.Capabilities.V1.FilterRestrictions"].NonFilterableProperties) {
				var aNonFilterableProperties = oContextSet["Org.OData.Capabilities.V1.FilterRestrictions"].NonFilterableProperties;
				for (var j = aNonFilterableProperties.length - 1; j >= 0; j--) {
					if (aNonFilterableProperties[j].PropertyPath === oDataField.Value.Path) {
						bNotFilterable = true;
						break;
					}
				}
			}
		} else {
			bNotFilterable = true;
		}
	}
	if (!bNotFilterable) {
		sP13N += '", "filterProperty":"' + oContextProp.name;
	}
	return sP13N + '" \\}';
};

sap.ui.generic.app.AppComponent.extend("sap.ibso.skyeyeForCdc.component.test.Component", {
	metadata: {
		manifest: "json"
	},
	getMockServers: function() {
		return [oMockServer];
	}
});

sap.ui.generic.app.AppComponent.extend("sap.ibso.skyeyeForCdc.component.test.Component", {
	metadata: {
		"manifest": "json"
	}
});
