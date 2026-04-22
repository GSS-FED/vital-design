export const testData = [
  {
    label: '',
    data: [
      {
        displayName: '略過此關卡',
        id: 'skip',
        data: {
          subjectType: 1,
        },
        children: undefined,
        textColor: '#FF0000',
      },
    ],
  },
  {
    label: '',
    data: [
      {
        displayName: '上一關簽核主管',
        id: '-3',
        data: {
          subjectType: 1,
        },
        children: undefined,
      },
      {
        displayName: '本關簽核人主管',
        id: '-2',
        data: {
          subjectType: 1,
        },
        children: undefined,
      },
      {
        displayName: '起單人的主管',
        id: '-1',
        data: {
          subjectType: 1,
        },
        children: undefined,
      },
    ],
  },
  {
    label: 'AA',
    data: [
      {
        displayName: '所有人',
        id: 'allMembers',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '組織1-1',
            id: '1',
            data: {
              subjectType: 2,
            },
            children: [
              {
                displayName: '組織1-1-1',
                id: 'A',
                data: {
                  subjectType: 2,
                },
                children: [
                  {
                    displayName: '成員A',
                    id: 'AB',
                    data: {
                      subjectType: 2,
                    },
                  },
                ],
              },
              {
                displayName: '成員A2',
                id: 'AB2',
                data: {
                  subjectType: 2,
                },
              },
            ],
          },
          {
            displayName: '成員2',
            id: '2',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '3',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員4',
            id: '4',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員5',
            id: '5',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員6',
            id: '6',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員7',
            id: '7',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員8',
            id: '8',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員9',
            id: '9',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員10',
            id: '10',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員11',
            id: '11',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '未分配成員',
        id: '12',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '成員1',
            id: '13',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員2',
            id: '14',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
    ],
  },
  {
    label: '組織',
    data: [
      {
        displayName: '組織1',
        id: '15',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '成員1',
            id: '16',
            data: {
              subjectType: 2,
            },
            suffixIcon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34l-5.8 11.6L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7l-72-57.6L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0l4.4 23.9L86.4 427.4c5.5 30.4 32 52.6 63 52.6l277.2 0c30.9 0 57.4-22.1 63-52.6l41.4-227.5 4.4-23.9c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-17.1 13.7-72 57.6c-15.9 12.7-39.5 7.5-48.6-10.7L314.8 117.7 309 106zM133.7 418.9L102.2 245.6l28.9 23.1c39.8 31.8 98.8 18.9 121.5-26.7L288 171.3l35.4 70.7c22.8 45.6 81.8 58.5 121.5 26.7l28.9-23.1L442.3 418.9c-1.4 7.6-8 13.1-15.7 13.1l-277.2 0c-7.7 0-14.4-5.5-15.7-13.1z" />
              </svg>
            ),
          },
          {
            displayName: '成員2',
            id: '17',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '18',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '組織2',
        id: '19',
        data: {
          subjectType: 1,
        },
        parents: [],
        createdAt: '1',
        updatedAt: '1',
        children: [
          {
            displayName: '成員1',
            id: '20',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員2',
            id: '21',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '22',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '組織3 (無成員)',
        id: 'og3',
        data: {
          subjectType: 1,
        },
        children: [],
      },
    ],
  },
  {
    label: '群組',
    data: [
      {
        displayName: '群組 (無成員)',
        id: 'group-no-user',
        data: {
          subjectType: 1,
        },
        children: [],
      },
      {
        displayName: '群組1',
        id: '23',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '成員1',
            id: '24',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員2',
            id: '25',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '26',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '群組2',
        id: '27',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '成員1',
            id: '28',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員2',
            id: '29',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '30',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '群組3',
        id: '31',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '成員1',
            id: '32',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員2',
            id: '33',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '34',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '群組4',
        id: '35',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '成員1',
            id: '36',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員2',
            id: '37',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '38',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '群組5',
        id: '39',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '成員1',
            id: '40',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員2',
            id: '41',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '42',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '群組6',
        id: '43',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '成員1',
            id: '44',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員2',
            id: '45',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '46',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '群組7',
        id: '47',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '成員1',
            id: '48',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員2',
            id: '49',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '50',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '群組8',
        id: '51',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '成員1',
            id: '52',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員2',
            id: '53',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '54',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '群組9',
        id: '55',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '成員1',
            id: '56',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員2',
            id: '57',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '58',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '群組10',
        id: '59',
        data: {
          subjectType: 1,
        },
        children: [
          {
            displayName: '成員1',
            id: '60',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員2',
            id: '61',
            data: {
              subjectType: 2,
            },
          },
          {
            displayName: '成員3',
            id: '62',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
    ],
  },
];

export const treeSelectValueData = [
  {
    displayName: '所有人',
    id: 'allMembers',
    data: {
      subjectType: 1,
    },
    children: [
      {
        displayName: '組織1-1',
        id: '1',
        data: {
          subjectType: 2,
        },
        children: [
          {
            displayName: '組織1-1-1',
            id: 'A',
            data: {
              subjectType: 2,
            },
            children: [
              {
                displayName: '成員A',
                id: 'AB',
                data: {
                  subjectType: 2,
                },
              },
            ],
          },
          {
            displayName: '成員A2',
            id: 'AB2',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '成員2',
        id: '2',
        data: {
          subjectType: 2,
        },
      },
      {
        displayName: '成員3',
        id: '3',
        data: {
          subjectType: 2,
        },
      },
      {
        displayName: '成員4',
        id: '4',
        data: {
          subjectType: 2,
        },
      },
      {
        displayName: '成員5',
        id: '5',
        data: {
          subjectType: 2,
        },
      },
      {
        displayName: '成員6',
        id: '6',
        data: {
          subjectType: 2,
        },
      },
      {
        displayName: '成員7',
        id: '7',
        data: {
          subjectType: 2,
        },
      },
      {
        displayName: '成員8',
        id: '8',
        data: {
          subjectType: 2,
        },
      },
      {
        displayName: '成員9',
        id: '9',
        data: {
          subjectType: 2,
        },
      },
      {
        displayName: '成員10',
        id: '10',
        data: {
          subjectType: 2,
        },
      },
      {
        displayName: '成員11',
        id: '11',
        data: {
          subjectType: 2,
        },
      },
    ],
  },
  {
    displayName: '組織1-1',
    id: '1',
    data: {
      subjectType: 2,
    },
    children: [
      {
        displayName: '組織1-1-1',
        id: 'A',
        data: {
          subjectType: 2,
        },
        children: [
          {
            displayName: '成員A',
            id: 'AB',
            data: {
              subjectType: 2,
            },
          },
        ],
      },
      {
        displayName: '成員A2',
        id: 'AB2',
        data: {
          subjectType: 2,
        },
      },
    ],
  },
  {
    displayName: '組織1-1-1',
    id: 'A',
    data: {
      subjectType: 2,
    },
    children: [
      {
        displayName: '成員A',
        id: 'AB',
        data: {
          subjectType: 2,
        },
      },
    ],
  },
  {
    displayName: '成員A',
    id: 'AB',
    data: {
      subjectType: 2,
    },
  },
];
