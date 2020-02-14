/*----------------------------------------------------------------------*
 * Copyright  (c) 2016 SAP SE. All rights reserved
 * Author       : SAP Custom Development
 * Description  : LeafletMarker Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define([
	"./../library", "sap/ui/base/ManagedObject"
], function (library, ManagedObject) {
	"use strict";
	return ManagedObject.extend('sap.vco.leaflet.controls.Marker', {

		metadata: {
			library: "sap.vco.leaflet",
			properties: {
				latlng: {
					type: 'string',
					defaultValue: "31.201684297903483,121.59914195537566"
				},
				_origin: {
					type: 'object',
					defaultValue: null,
					visibility: 'hidden'
				},
				content: {
					type: 'string',
					defaultValue: null
				},
				direction: {
					type: 'int',
					defaultValue: 0
				},
				icon: {
					type: 'any',
					defaultValue: null
				},
				iconUrl: {
					type: 'string',
					defaultValue: null
				},
				relatedInfo: {
					type: 'object',
					defaultValue: null
				},
				zIndexoffset: {
					type: 'any',
					defaultValue: 0
				},
				opacity: {
					type: 'int',
					defaultValue: 1
				},
				width: {
					type: 'int',
					defaultValue: 20
				},
				height: {
					type: 'int',
					defaultValue: 20
				}
			},
			events: {
				"press": {
					// parameters: {
					// 	mouseEvent: { type: "object" }
					// }
				}
			}
		},

		constructor: function () {

			sap.ui.base.ManagedObject.apply(this, arguments);

			// var marker = this.getProperty('_origin');
			// if (typeof marker === 'undefined' || marker === null) {
			// 	this._initMarker();
			// }
		},

		_initMarker: function () {
			// var that = this;
			var latlng = this.getProperty('latlng');
			// var rootPath = sap.ui.require.toUrl("sap/vco/leaflet/thirdparty");
			var icon = this.getProperty("icon");
			var sIconUrl = this.getProperty("iconUrl");
			var iWidth = this.getProperty("width");
			var iHeight = this.getProperty("height");

			var iDirection = this.getProperty('direction');

			if (icon === null || typeof icon === 'undefined') {
				icon = new L.Icon.Default();
			} else if (iDirection >= 0) {
				icon = L.divIcon({
					bgPos: [iWidth / 2, iHeight / 2],
					className: 'my-div-icon',
					// iconAnchor: icon.iconAnchor,
					// html: '<div style="transform-origin:' + icon.origin.x + " " + icon.origin.y + '; transform: rotate(' + icon.angle + 'deg)">' + '<img src=' + icon.url + ' />' + '</div>'
					html: '<div style="transform: translate(-' + iWidth / 2 + 'px, -' + iHeight / 2 + 'px) rotate(' + iDirection + 'deg)">' + '<img src=' + sIconUrl + ' width=' + iWidth + ' height=' + iHeight + ' />' + '</div>'
				});

			} else if ($.isPlainObject(icon)) {
				icon = L.icon(icon);
			} else if (typeof icon === 'string') {
				icon = L.icon({
					iconUrl: icon,
					iconSize: [iWidth, iHeight]
				});
			}

			var content = this.getProperty('content');

			var marker = L.marker(latlng.split(","), {
				icon: icon,
				opacity: this.getOpacity(),
				zIndexOffset: this.getZIndexoffset(),
				relatedInfo: this.getRelatedInfo()
			});

			marker.on("mousedown", this.firePress.bind(this));

			if (content !== null && content !== '') {
				marker.bindPopup(content);
			}

			this.setProperty('_origin', marker, true);
		},

		setIconUrl: function(sIconUrl){
			this.setProperty('iconUrl', sIconUrl, true);
			this.refreshIcon();
		},

		setDirection: function (iDirection) {
			this.setProperty('direction', iDirection, true);
			this.refreshIcon();
		},

		refreshIcon: function(){
			var sIconUrl = this.getProperty("iconUrl");
			var iDirection = this.getProperty("direction");
			var iWidth = this.getProperty("width");
			var iHeight = this.getProperty("height");
			var _origin = this.getProperty('_origin');
			if (_origin === null || typeof _origin === 'undefined') {
				return;
			}
			_origin.setIcon(L.divIcon({
				bgPos: [iWidth / 2, iHeight / 2],
				className: 'my-div-icon',
				// iconAnchor: icon.iconAnchor,
				// html: '<div style="transform-origin:' + icon.origin.x + " " + icon.origin.y + '; transform: rotate(' + icon.angle + 'deg)">' + '<img src=' + icon.url + ' />' + '</div>'
				html: '<div style="transform: translate(-' + iWidth / 2 + 'px, -' + iHeight / 2 + 'px) rotate(' + iDirection + 'deg)">' + '<img src=' + sIconUrl + ' width=' + iWidth + ' height=' + iHeight + ' />' + '</div>'
			}));
			
		},

		getOrigin: function () {
			var _origin = this.getProperty('_origin');
			if (_origin === null || typeof _origin === 'undefined') {
				this._initMarker();
			}
			return this.getProperty('_origin');
		},

		setLatlng: function (latlng) {
			var marker = this.getProperty('_origin');
			if (marker && latlng && typeof marker !== 'undefined') {
				var oLatLng = L.latLng(latlng.split(","));
				marker.setLatLng(oLatLng);
			}
			this.setProperty('latlng', latlng, true);
		},

		setContent: function (content) {
			var marker = this.getProperty('_origin');
			if (marker !== null && typeof marker !== 'undefined') {
				if (content !== null && content !== '') {
					marker.bindPopup(content);
				}
			}
			this.setProperty('content', content, true);
		},

		setOpacity: function (opacity) {
			var marker = this.getProperty('_origin');
			if (marker !== null && typeof marker !== 'undefined') {
				marker.setOpacity(opacity);
			}
			this.setProperty('opacity', opacity, true);
		}
	});
});
