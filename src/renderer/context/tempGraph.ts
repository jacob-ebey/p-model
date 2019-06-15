export default {
  "id": "demo@0.1.0",
  "nodes": {
    "1": {
      "id": 1,
      "data": {
        "width": 0,
        "height": 0,
        "depth": 0
      },
      "inputs": {
        "width": {
          "connections": [
            {
              "node": 7,
              "output": "number",
              "data": {}
            }
          ]
        },
        "height": {
          "connections": [
            {
              "node": 7,
              "output": "number",
              "data": {}
            }
          ]
        },
        "depth": {
          "connections": [
            {
              "node": 7,
              "output": "number",
              "data": {}
            }
          ]
        },
        "position": {
          "connections": [
            {
              "node": 3,
              "output": "vector3",
              "data": {}
            }
          ]
        },
        "rotation": {
          "connections": []
        },
        "material": {
          "connections": [
            {
              "node": 19,
              "output": "material",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "mesh": {
          "connections": [
            {
              "node": 5,
              "input": "mesh",
              "data": {}
            }
          ]
        }
      },
      "position": [
        485.82825256326396,
        358.5707271531749
      ],
      "name": "Box"
    },
    "3": {
      "id": 3,
      "data": {
        "x": 0,
        "y": "1",
        "z": 0
      },
      "inputs": {
        "x": {
          "connections": []
        },
        "y": {
          "connections": []
        },
        "z": {
          "connections": []
        }
      },
      "outputs": {
        "vector3": {
          "connections": [
            {
              "node": 1,
              "input": "position",
              "data": {}
            }
          ]
        }
      },
      "position": [
        146.11507143279582,
        298.9309754053558
      ],
      "name": "Vector3"
    },
    "5": {
      "id": 5,
      "data": {},
      "inputs": {
        "mesh": {
          "connections": [
            {
              "node": 1,
              "output": "mesh",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "csg": {
          "connections": [
            {
              "node": 15,
              "input": "b",
              "data": {}
            }
          ]
        }
      },
      "position": [
        773.2956314711137,
        489.76522892337505
      ],
      "name": "CSG"
    },
    "6": {
      "id": 6,
      "data": {
        "width": 0,
        "height": 0,
        "depth": 0
      },
      "inputs": {
        "width": {
          "connections": [
            {
              "node": 7,
              "output": "number",
              "data": {}
            }
          ]
        },
        "height": {
          "connections": [
            {
              "node": 7,
              "output": "number",
              "data": {}
            }
          ]
        },
        "depth": {
          "connections": [
            {
              "node": 7,
              "output": "number",
              "data": {}
            }
          ]
        },
        "position": {
          "connections": []
        },
        "rotation": {
          "connections": []
        },
        "material": {
          "connections": [
            {
              "node": 18,
              "output": "material",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "mesh": {
          "connections": [
            {
              "node": 8,
              "input": "mesh",
              "data": {}
            }
          ]
        }
      },
      "position": [
        481.930694986337,
        723.8870592488646
      ],
      "name": "Box"
    },
    "7": {
      "id": 7,
      "data": {
        "num": 1,
        "math": "1"
      },
      "inputs": {},
      "outputs": {
        "number": {
          "connections": [
            {
              "node": 6,
              "input": "width",
              "data": {}
            },
            {
              "node": 6,
              "input": "height",
              "data": {}
            },
            {
              "node": 6,
              "input": "depth",
              "data": {}
            },
            {
              "node": 1,
              "input": "width",
              "data": {}
            },
            {
              "node": 1,
              "input": "height",
              "data": {}
            },
            {
              "node": 1,
              "input": "depth",
              "data": {}
            }
          ]
        }
      },
      "position": [
        127.76940450668812,
        728.7418888703468
      ],
      "name": "Number"
    },
    "8": {
      "id": 8,
      "data": {},
      "inputs": {
        "mesh": {
          "connections": [
            {
              "node": 6,
              "output": "mesh",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "csg": {
          "connections": [
            {
              "node": 14,
              "input": "b",
              "data": {}
            }
          ]
        }
      },
      "position": [
        774.7915997680061,
        670.8974618000834
      ],
      "name": "CSG"
    },
    "10": {
      "id": 10,
      "data": {
        "diameter": "2",
        "segments": "32"
      },
      "inputs": {
        "diameter": {
          "connections": []
        },
        "segments": {
          "connections": []
        },
        "position": {
          "connections": [
            {
              "node": 22,
              "output": "vector3",
              "data": {}
            }
          ]
        },
        "rotation": {
          "connections": []
        },
        "material": {
          "connections": [
            {
              "node": 16,
              "output": "material",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "mesh": {
          "connections": [
            {
              "node": 12,
              "input": "mesh",
              "data": {}
            }
          ]
        }
      },
      "position": [
        476.42168639754976,
        1106.1736379631295
      ],
      "name": "Sphere"
    },
    "12": {
      "id": 12,
      "data": {},
      "inputs": {
        "mesh": {
          "connections": [
            {
              "node": 10,
              "output": "mesh",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "csg": {
          "connections": [
            {
              "node": 14,
              "input": "a",
              "data": {}
            }
          ]
        }
      },
      "position": [
        777.8848466620013,
        879.5684415487481
      ],
      "name": "CSG"
    },
    "14": {
      "id": 14,
      "data": {
        "operation": 0
      },
      "inputs": {
        "a": {
          "connections": [
            {
              "node": 12,
              "output": "csg",
              "data": {}
            }
          ]
        },
        "b": {
          "connections": [
            {
              "node": 8,
              "output": "csg",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "csg": {
          "connections": [
            {
              "node": 15,
              "input": "a",
              "data": {}
            }
          ]
        }
      },
      "position": [
        1091.8731864350364,
        718.2290955495014
      ],
      "name": "CSG Operation"
    },
    "15": {
      "id": 15,
      "data": {
        "operation": 0
      },
      "inputs": {
        "a": {
          "connections": [
            {
              "node": 14,
              "output": "csg",
              "data": {}
            }
          ]
        },
        "b": {
          "connections": [
            {
              "node": 5,
              "output": "csg",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "csg": {
          "connections": [
            {
              "node": 26,
              "input": "a",
              "data": {}
            }
          ]
        }
      },
      "position": [
        1371.8818767032735,
        509.49591739322574
      ],
      "name": "CSG Operation"
    },
    "16": {
      "id": 16,
      "data": {
        "alpha": "1"
      },
      "inputs": {
        "diffuseColor": {
          "connections": [
            {
              "node": 17,
              "output": "color3",
              "data": {}
            }
          ]
        },
        "alpha": {
          "connections": []
        }
      },
      "outputs": {
        "material": {
          "connections": [
            {
              "node": 10,
              "input": "material",
              "data": {}
            }
          ]
        }
      },
      "position": [
        154.47363830692296,
        1370.1973877939286
      ],
      "name": "Standard Material"
    },
    "17": {
      "id": 17,
      "data": {
        "x": "1",
        "y": 0,
        "z": 0,
        "r": "1",
        "g": 0,
        "b": 0
      },
      "inputs": {
        "r": {
          "connections": []
        },
        "g": {
          "connections": []
        },
        "b": {
          "connections": []
        }
      },
      "outputs": {
        "color3": {
          "connections": [
            {
              "node": 16,
              "input": "diffuseColor",
              "data": {}
            }
          ]
        }
      },
      "position": [
        -113.71674112443978,
        1405.2530053119601
      ],
      "name": "Color3"
    },
    "18": {
      "id": 18,
      "data": {
        "alpha": "1"
      },
      "inputs": {
        "diffuseColor": {
          "connections": [
            {
              "node": 21,
              "output": "color3",
              "data": {}
            }
          ]
        },
        "alpha": {
          "connections": []
        }
      },
      "outputs": {
        "material": {
          "connections": [
            {
              "node": 6,
              "input": "material",
              "data": {}
            }
          ]
        }
      },
      "position": [
        145.8535539784104,
        935.6356489665974
      ],
      "name": "Standard Material"
    },
    "19": {
      "id": 19,
      "data": {
        "alpha": "1"
      },
      "inputs": {
        "diffuseColor": {
          "connections": [
            {
              "node": 20,
              "output": "color3",
              "data": {}
            }
          ]
        },
        "alpha": {
          "connections": []
        }
      },
      "outputs": {
        "material": {
          "connections": [
            {
              "node": 1,
              "input": "material",
              "data": {}
            }
          ]
        }
      },
      "position": [
        144.238333039706,
        532.1314955261166
      ],
      "name": "Standard Material"
    },
    "20": {
      "id": 20,
      "data": {
        "x": "0",
        "y": 0,
        "z": "1",
        "r": 0,
        "g": 0,
        "b": "1"
      },
      "inputs": {
        "r": {
          "connections": []
        },
        "g": {
          "connections": []
        },
        "b": {
          "connections": []
        }
      },
      "outputs": {
        "color3": {
          "connections": [
            {
              "node": 19,
              "input": "diffuseColor",
              "data": {}
            }
          ]
        }
      },
      "position": [
        -149.03417794745735,
        566.4502151370556
      ],
      "name": "Color3"
    },
    "21": {
      "id": 21,
      "data": {
        "x": 0,
        "y": "1",
        "z": 0,
        "r": 0,
        "g": "1",
        "b": 0
      },
      "inputs": {
        "r": {
          "connections": []
        },
        "g": {
          "connections": []
        },
        "b": {
          "connections": []
        }
      },
      "outputs": {
        "color3": {
          "connections": [
            {
              "node": 18,
              "input": "diffuseColor",
              "data": {}
            }
          ]
        }
      },
      "position": [
        -150.35614917300694,
        972.8431758638138
      ],
      "name": "Color3"
    },
    "22": {
      "id": 22,
      "data": {
        "x": 0,
        "y": "0.5",
        "z": 0
      },
      "inputs": {
        "x": {
          "connections": []
        },
        "y": {
          "connections": []
        },
        "z": {
          "connections": []
        }
      },
      "outputs": {
        "vector3": {
          "connections": [
            {
              "node": 10,
              "input": "position",
              "data": {}
            }
          ]
        }
      },
      "position": [
        154.24435925989815,
        1151.3268407469673
      ],
      "name": "Vector3"
    },
    "24": {
      "id": 24,
      "data": {
        "r": "1",
        "g": 0,
        "b": "1"
      },
      "inputs": {
        "r": {
          "connections": []
        },
        "g": {
          "connections": []
        },
        "b": {
          "connections": []
        }
      },
      "outputs": {
        "color3": {
          "connections": [
            {
              "node": 25,
              "input": "diffuseColor",
              "data": {}
            }
          ]
        }
      },
      "position": [
        -142.49891161242044,
        1937.1331301335065
      ],
      "name": "Color3"
    },
    "25": {
      "id": 25,
      "data": {
        "alpha": "1"
      },
      "inputs": {
        "diffuseColor": {
          "connections": [
            {
              "node": 24,
              "output": "color3",
              "data": {}
            }
          ]
        },
        "alpha": {
          "connections": []
        }
      },
      "outputs": {
        "material": {
          "connections": [
            {
              "node": 28,
              "input": "material",
              "data": {}
            }
          ]
        }
      },
      "position": [
        142.1685034578594,
        1897.0603084442432
      ],
      "name": "Standard Material"
    },
    "26": {
      "id": 26,
      "data": {
        "operation": "intersect"
      },
      "inputs": {
        "a": {
          "connections": [
            {
              "node": 15,
              "output": "csg",
              "data": {}
            }
          ]
        },
        "b": {
          "connections": [
            {
              "node": 31,
              "output": "csg",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "csg": {
          "connections": []
        }
      },
      "position": [
        1696.0566827208233,
        780.1328124469132
      ],
      "name": "CSG Operation"
    },
    "28": {
      "id": 28,
      "data": {
        "width": 0,
        "height": 0,
        "depth": 0
      },
      "inputs": {
        "width": {
          "connections": [
            {
              "node": 29,
              "output": "number",
              "data": {}
            }
          ]
        },
        "height": {
          "connections": [
            {
              "node": 29,
              "output": "number",
              "data": {}
            }
          ]
        },
        "depth": {
          "connections": [
            {
              "node": 29,
              "output": "number",
              "data": {}
            }
          ]
        },
        "position": {
          "connections": [
            {
              "node": 30,
              "output": "vector3",
              "data": {}
            }
          ]
        },
        "rotation": {
          "connections": []
        },
        "material": {
          "connections": [
            {
              "node": 25,
              "output": "material",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "mesh": {
          "connections": [
            {
              "node": 31,
              "input": "mesh",
              "data": {}
            }
          ]
        }
      },
      "position": [
        472.3304166569203,
        1474.0699262947473
      ],
      "name": "Box"
    },
    "29": {
      "id": 29,
      "data": {
        "math": "1.8"
      },
      "inputs": {},
      "outputs": {
        "number": {
          "connections": [
            {
              "node": 28,
              "input": "width",
              "data": {}
            },
            {
              "node": 28,
              "input": "height",
              "data": {}
            },
            {
              "node": 28,
              "input": "depth",
              "data": {}
            }
          ]
        }
      },
      "position": [
        126.1948863546119,
        1541.4385917186319
      ],
      "name": "Number"
    },
    "30": {
      "id": 30,
      "data": {
        "x": 0,
        "y": "0.5",
        "z": 0
      },
      "inputs": {
        "x": {
          "connections": []
        },
        "y": {
          "connections": []
        },
        "z": {
          "connections": []
        }
      },
      "outputs": {
        "vector3": {
          "connections": [
            {
              "node": 28,
              "input": "position",
              "data": {}
            }
          ]
        }
      },
      "position": [
        136.35031841720922,
        1672.392944838357
      ],
      "name": "Vector3"
    },
    "31": {
      "id": 31,
      "data": {},
      "inputs": {
        "mesh": {
          "connections": [
            {
              "node": 28,
              "output": "mesh",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "csg": {
          "connections": [
            {
              "node": 26,
              "input": "b",
              "data": {}
            }
          ]
        }
      },
      "position": [
        762.7125812646757,
        1176.4604440700984
      ],
      "name": "CSG"
    }
  }
};
