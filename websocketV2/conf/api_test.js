module.exports = {
  /**
  task_target: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/gop',
      isRO: boolean,  //will request update device status
      sync: boolean,  //will request need to wait for sync message
      reboot: boolean,  //will request reboot system
      parameters: object,
      timeout: number //ms
      wait: number //ms, close connection after xxx ms
      callback: string,  //specify callback handler name
      expectations: object
    }
  },
  **/
  /* device/hardware */
  get_device_info: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/device/hardware/device_info',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'model': 'IJ06',
        'vendor': 'Quanta',
        'version': 'A1',
        'serialNo': '01a64e685b2b81dba07deee8adf9ea0103610fd6',
        'cuid': '12345678',
        'hashCode': ''
      }
    }
  },
  get_fw_info: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/device/hardware/fw_info',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'image': '',
        'application': '',
        'sdk': '',
        'dsp': '',
        'script': ''
      }
    }
  },
  get_device_capabilities: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/device/hardware/capabilities',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'capabilities': [{'name':'','support':''}]
      }
    }
  },
  get_device_status: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/device/hardware/status',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'status': [{
          'name':'',
          'value':''
        }]
      }
    }
  },

  /* device/system */
  get_sys_info: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/device/system/sys_info',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'enabled': ''
      }
    }
  },
  get_nvram: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/device/system/nvram',
      isRO: true,
      sync: false,
      parameters: {
        "key": "Device_Video_AVC_FPS"
      },
      callback: 'chkResponseFormat',
      expectations: {
        'nvram': [{
          'name':'',
          'value':''
        }]
      }
    }
  },
  set_nvram: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/device/system/nvram',
      isRO: false,
      sync: false,
      parameters: {
        "nvram": [
          {
            "key": "Device_Video_AVC_FPS",
            "value": "20"
          }
        ]
      }
    }
  },
  get_datetime: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/device/system/datetime',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'timeStamp': '',
        'timeZone': ''
      }
    }
  },
  set_datetime: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/device/system/datetime',
      isRO: false,
      sync: false,
      parameters: {
        "timeStamp": 1000000000,
        "timeZone" : "UTC+8"
      }
    }
  },
  get_sys_settings: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/device/system/settings',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'settings': [{
          'name':'',
          'value':''
        }]
      }
    }
  },
//  download_fw: {
//    options: {
//      ip: '<%= globalConfig.deviceIP %>',
//      port: '<%= globalConfig.port %>',
//      uri: '/<%= globalConfig.apiver %>/device/system/fw_download',
//      isRO: false,
//      sync: false,
//      parameters: {
//        "filename": "",
//        "serverAddress" : "",
//        "sha1sum": ""
//      }
//    }
//  },
//  upgrade_fw: {
//    options: {
//      ip: '<%= globalConfig.deviceIP %>',
//      port: '<%= globalConfig.port %>',
//      uri: '/<%= globalConfig.apiver %>/device/system/fw_upgrade',
//      isRO: false,
//      sync: false,
//      parameters: {
//        "filename": "",
//      }
//    }
//  },
//  reboot_sys: {
//    options: {
//      ip: '<%= globalConfig.deviceIP %>',
//      port: '<%= globalConfig.port %>',
//      uri: '/<%= globalConfig.apiver %>/device/system/reboot',
//      isRO: false,
//      sync: false,
//      parameters: {
//        "seconds": 0,
//      }
//    }
//  },
//  emit_command: {
//    options: {
//      ip: '<%= globalConfig.deviceIP %>',
//      port: '<%= globalConfig.port %>',
//      uri: '/<%= globalConfig.apiver %>/device/system/command',
//      isRO: false,
//      sync: false,
//      parameters: {
//        "cmd": "",
//      }
//    }
//  },
//  factory_reset: {
//    options: {
//      ip: '<%= globalConfig.deviceIP %>',
//      port: '<%= globalConfig.port %>',
//      uri: '/<%= globalConfig.apiver %>/device/system/factory_reset',
//      isRO: false,
//      sync: false,
//      reboot: true
//    }
//  },
//  unbind_device: {
//    options: {
//      ip: '<%= globalConfig.deviceIP %>',
//      port: '<%= globalConfig.port %>',
//      uri: '/<%= globalConfig.apiver %>/device/system/unbind',
//      isRO: false,
//      sync: false,
//      reboot: true
//    }
//  },


  /* network/management */
  get_network_interface: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/network/management/interfaces',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'interfaces': [{
          'name':'',
          'macAddress': ''
        }]
      }
    }
  },
   get_network_external_ip: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/network/management/external_ip',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'ip': ''
      }
    }
  },
  get_network_ip_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/network/management/ip_setting',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'ip': '',
        'subnet': ''
      }
    }
  },
  set_network_ip_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/network/management/ip_setting',
      isRO: false,
      sync: false,
      //reboot: true,
      parameters: {
        'ip': '10.0.0.10',
        'subnet': '255.255.255.0'
      }
    }
  },
  get_network_ping: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/network/management/ping',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'transmitted': '',
        'received': '',
        'loss': ''
      },
      parameters:{
        'ip': '10.0.0.111'
      }
    }
  },
  get_network_statistics: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/network/management/statistics',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        interfaces: [{
          'name':'',
          'tx': '',
          'rx': ''
        }]
      }
    }
  },

  /* nework/wifi */
  get_wifi_security: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/network/wifi/security',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        interfaces: [{
          'name':'',
          'ssid': '',
          'mode': '',
          'encrypt': '',
          'key': ''
        }]
      }
    }
  },
  set_wifi_security: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/network/wifi/security',
      isRO: false,
      sync: true,
      expectations: {
        interfaces: {
          'name':'5g',
          'ssid': 'testwifi',
          //'mode': '',
          //'encrypt': '',
          //'key': ''
        }
      }
    }
  }, get_wifi_available_interfaces: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/network/wifi/available_interfaces',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'interfaces': [{
          'name':'',
          'type': '',
          'encrypt': ''
        }]
      }
    }
  },
  set_wifi_wps: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/network/wifi/do_wps',
      isRO: false,
      sync: true,
      parameters: {
        'interface': '5g'
      }
    }
  },
  get_wifi_site_survey: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/network/wifi/site_survey',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'sites': [{
          'channel':'',
          'ssid': '',
          'rssi': '',
          'security': '',
          'encrypt': ''
        }]
      }
    }
  },


  /* video/mjpg */
  get_mjpg_stream: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/mjpg/stream',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'enabled': ''
      }
    }
  },
  get_mjpg_resolution: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/mjpg/resolution',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'width': '',
        'height': ''
      }
    }
  },
  set_mjpg_resolution: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/mjpg/resolution',
      isRO: false,
      sync: true,
      parameters: {
        'width': 320,
        'height': 240
      }
    }
  },
  get_mjpg_fps: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/mjpg/fps',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'fps': ''
      }
    }
  },
  set_mjpg_fps: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/mjpg/fps',
      isRO: false,
      sync: true,
      parameters: {
        'value': 30,
      }
    }
  },
  get_mjpg_cur_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/mjpg/setting',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'resolution': {
          'width':'',
          'height':''
        },
        'fps': ''
      }
    }
  },
  set_mjpg_cur_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/mjpg/setting',
      isRO: false,
      sync: true,
      parameters: {
        'resolution': {
          'width': 320,
          'height': 240
        }
      }
    }
  },
  get_mjpg_default_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/mjpg/default_setting',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'resolution': {
          'width':'',
          'height':''
        },
        'fps': ''
      }
    }
  },
  set_mjpg_default_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/mjpg/default_setting',
      isRO: false,
      sync: true,
      parameters: {
        'resolution': {
          'width': 320,
          'height': 240
        }
      }
    }
  },
  get_mjpg_constraints: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/mjpg/constraints',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'resolution': [{
          'width': '',
          'height': '',
          'name':''
        }]
      }
    }
  },

  /* video/avc */
  get_avc_resolution: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/resolution',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
          'width': '',
          'height': ''
      }
    }
  },
  set_avc_resolution: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/resolution',
      isRO: false,
      sync: true,
      parameters: {
        'width': 640,
        'height': 480
      }
    }
  },
  get_avc_fps: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/fps',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'value': '',
      }
    }
  },
  set_avc_fps: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/fps',
      isRO: false,
      sync: true,
      parameters: {
        'value': 10
      }
    }
  },
  get_avc_bitrate: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/bitrate',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'value': '',
      }
    }
  },
  set_avc_bitrate: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/bitrate',
      isRO: false,
      sync: true,
      parameters: {
        'value': 1000000
      }
    }
  },
  get_avc_gop: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/gop',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'value': '',
      }
    }
  },
  set_avc_gop: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/gop',
      isRO: false,
      sync: true,
      parameters: {
        'value': 50
      }
    }
  },

  get_avc_cur_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/setting',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'resolution': {
          'width':'',
          'height':''
        },
        'fps': '',
        'bitrate': '',
        'gop': ''
      }

    }
  },
  set_avc_cur_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/setting',
      isRO: false,
      sync: true,
      parameters: {
        'resolution': {
          'width': 320,
          'height': 240
        },
        'fps': 20,
        'gop': 50,
        'bitrate': 1000000
      }
    }
  },
  get_avc_default_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/default_setting',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'resolution': {
          'width':'',
          'height':''
        },
        'fps': '',
        'bitrate': '',
        'gop': ''
      }

    }
  },
  set_avc_default_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/setting',
      isRO: false,
      sync: true,
      parameters: {
        'resolution': {
          'width': 1280,
          'height': 720
        },
        'fps': 30,
        'gop': 30,
        'bitrate': 2000000
      }
    }
  },
  get_avc_constraints: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/constraints',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'bitrate': {'min':500000, 'max':5000000},
        'fps': {'min':5, 'max':30},
        'gop':{'min':30, 'max':120},
        'resolution': [{
          'width':320,
          'height': 240,
          'name': 'QVGA',
        },{
          'width':640,
          'height': 480,
          'name': 'VGA',
        },{
          'width':1280,
          'height': 720,
          'name': 'HD',
        }]
      }
    }
  },
  get_avc_capabilities: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/avc/capabilities',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'simulcast': '',
        'OSD': ''
      }
    }
  },

  /* video/common */
  get_video_brightness: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/brightness',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'value': '',
      }

    }
  },
  set_video_brightness: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/brightness',
      isRO: false,
      sync: true,
      parameters: {
        'value' : 100
      }
    }
  },
  get_video_contrast: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/contrast',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'value': '',
      }

    }
  },
  set_video_contrast: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/contrast',
      isRO: false,
      sync: true,
      parameters: {
        'value' : 1
      }
    }
  },
  get_video_hue: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/hue',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'value': '',
      }

    }
  },
  set_video_hue: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/hue',
      isRO: false,
      sync: true,
      parameters: {
        'value' : 1
      }
    }
  },
  get_video_saturation: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/saturation',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'value': '',
      }

    }
  },
  set_video_saturation: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/saturation',
      isRO: false,
      sync: true,
      parameters: {
        'value' : 1
      }
    }
  },
  get_video_sharpness: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/sharpness',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'value': '',
      }

    }
  },
  set_video_sharpness: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/sharpness',
      isRO: false,
      sync: true,
      parameters: {
        'value' : 1
      }
    }
  },
  get_video_gamma: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/gamma',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'value': '',
      }

    }
  },
  set_video_gamma: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/gamma',
      isRO: false,
      sync: true,
      parameters: {
        'value' : 1
      }
    }
  },
  get_video_backlight: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/backlight_compensation',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'value': '',
      }

    }
  },
  set_video_backlight: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/backlight_compensation',
      isRO: false,
      sync: true,
      parameters: {
        'value' : 1
      }
    }
  },
  get_video_flip: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/flip',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'mode': '',
      }

    }
  },
  set_video_flip: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/flip',
      isRO: false,
      sync: true,
      parameters: {
        'mode' : 'mirror'
      }
    }
  },
  get_video_cur_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/setting',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'brightness': '',
        'contrast': '',
        'hue': '',
        'saturation': '',
        'sharpness': '',
        'gamma': '',
        'backlightCompensation': '',
        'mode': ''
      }

    }
  },
  set_video_cur_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/setting',
      isRO: false,
      sync: true,
      parameters: {
      }
    }
  },
  set_video_default_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/default_setting',
      isRO: false,
      sync: true,
    }
  },
  get_video_constraints: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/video/common/constraints',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'brightness': {'min':'','max':''},
        'contrast': {'min':'','max':''},
        'hue': {'min':'','max':''},
        'saturation': {'min':'','max':''},
        'sharpness': {'min':'','max':''},
        'gamma': {'min':'','max':''},
        'backlightCompensation': {'min':'','max':''},
        'mode': ['']
      }

    }
  },

  /* audio/mic */
  get_mic_status: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/audio/mic/stream',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'enabled': ''
      }
    }
  },
//  set_mic_status: {
//    options: {
//      ip: '<%= globalConfig.deviceIP %>',
//      port: '<%= globalConfig.port %>',
//      uri: '/<%= globalConfig.apiver %>/audio/mic/stream',
//      isRO: false,
//      sync: false,
//      parameters:{
//        'enable': false
//      }
//    }
//  },
  get_audio_sample_rate: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/audio/mic/sample_rate',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'frequency': ''
      }

    }
  },
//  set_audio_sample_rate: {
//    options: {
//      ip: '<%= globalConfig.deviceIP %>',
//      port: '<%= globalConfig.port %>',
//      uri: '/<%= globalConfig.apiver %>/audio/mic/sample_rate',
//      isRO: false,
//      sync: false,
//      parameters:{
//        'frequency': 22050
//      }
//    }
//  },
//
  /* audio/speaker */
  get_speaker_status: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/audio/speaker/stream',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'enabled': ''
      }

    }
  },
//  set_speaker_status: {
//    options: {
//      ip: '<%= globalConfig.deviceIP %>',
//      port: '<%= globalConfig.port %>',
//      uri: '/<%= globalConfig.apiver %>/audio/speaker/stream',
//      isRO: false,
//      sync: false,
//      parameters:{
//        'enable': true
//      }
//    }
//  },
//  set_audio_playback: {
//    options: {
//      ip: '<%= globalConfig.deviceIP %>',
//      port: '<%= globalConfig.port %>',
//      uri: '/<%= globalConfig.apiver %>/audio/speaker/playback',
//      isRO: false,
//      sync: false,
//      parameters:{
//        'filename': ''
//      }
//    }
//  },
  get_audio_filelist: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/audio/speaker/file',
      isRO: true,
      sync: false,
    }
  },

  /* event/audio */
  get_audio_alarm:{
     options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/event/audio/alarm',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'enabled': '',
        'schedule': '',
        'rms': ''
      }

    }
  },
  set_audio_alarm:{
     options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/event/audio/alarm',
      isRO: false,
      sync: true,
      parameters:{
        'enable': true,
        'schedule': '0000000000000000000000000000000000000000000',
        'rms': -10
      }
    }
  },

  /* event/pir */
  get_pir_alarm:{
     options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/event/pir/alarm',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'enabled': '',
        'schedule': ''
      }
    }
  },
  set_pir_alarm:{
     options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/event/pir/alarm',
      isRO: false,
      sync: true,
      parameters:{
        'enable': true,
        'schedule': '0000000000000000000000000000000000000000000'
      }
    }
  },
  trigger_pir_alarm:{
     options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/event/pir/alarm',
      isRO: false,
      sync: false,
    }
  },

  /* event/record */
  get_record_duration:{
     options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/event/record/duration',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'value': ''
      }
    }
  },
  set_record_duration:{
     options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/event/record/duration',
      isRO: false,
      sync: true,
      parameters:{
        'value': 3000,
      }
    }
  },


  /* event/streamer */
  set_event_streamer:{
     options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/event/streamer/signal',
      isRO: false,
      sync: true,
      parameters:{
        'f': 1,
        'description': 'test'
      }
    }
  },


  /* io/pt */
  set_rotate: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/io/pt/rotate',
      isRO: false,
      sync: true,
      parameters: {
        'pan': 1000,
        'tilt': 500
      }
    }
  },
  stop_rotate: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/io/pt/stop',
      isRO: false,
      sync: false
    }
  },

  /* io/led */
  get_led: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/io/led/status',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'enabled': ''
      }
    }
  },
  set_led: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/io/led/status',
      isRO: false,
      sync: true,
      parameters: {
        'enabled': true
      }
    }
  },



  /* service/cloud */
  get_cloud_connection: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/service/cloud/connection',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'enabled': ''
      }

    }
  },
  get_cloud_setting: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/service/cloud/setting',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'mediator': ''
      }

    }
  },
  get_cloud_ws_info: {
    options: {
      ip: '<%= globalConfig.deviceIP %>',
      port: '<%= globalConfig.port %>',
      uri: '/<%= globalConfig.apiver %>/service/cloud/websocket_info',
      isRO: true,
      sync: false,
      callback: 'chkResponseFormat',
      expectations: {
        'subProtocol': '',
        'status': '',
        'timer': ''
      }

    }
  },



  /* service/stream */

}
