export const maps = [
    {
        name: "西土城",
        children: [],
        src: "/src/assets/maps/base.jpg",
        imgWidth: 1421,
        imgHeight: 2002,
        nodeRange: [0, 93],
        scaleRange: [0.4, 1.8],
        fixedX: (x) => {
            return (x * 1421) / 26.4372;
        },

        fixedY: (y) => {
            return 2002 - (y * 2002) / 36.3141;
        },
    },
    {
        name: "教三楼",
        src: "/src/assets/maps/3_1.jpg",
        imgWidth: "2595",
        imgHeight: "864",
        nodeRange: [94, 132],
        scaleRange: [0.1, 1],
        fixedX: (x) => {
            return x * 160.895 - 450;
        },

        fixedY: (y) => {
            return y * 142.3744 - 850;
        },
        children: [
            {
                name: "一楼",
                src: "/src/assets/maps/3_1.jpg",
                imgWidth: "2595",
                imgHeight: "864",
                nodeRange: [94, 132],
                scaleRange: [0.1, 1],
                fixedX: (x) => {
                    return x * 160.895 - 450;
                },

                fixedY: (y) => {
                    return y * 142.3744 - 850;
                },
            },
            {
                name: "二楼",
                src: "/src/assets/maps/3_2.jpg",
                imgWidth: "2595",
                imgHeight: "864",
                nodeRange: [133, 171],
                scaleRange: [0.1, 1],
                fixedX: (x) => {
                    return x * 220.6825 - 250;
                },

                fixedY: (y) => {
                    return 2600 - y * 215.4892;
                },
            },
            {
                name: "三楼",
                src: "/src/assets/maps/3_2.jpg",
                imgWidth: "2595",
                imgHeight: "864",
                nodeRange: [172, 210],
                scaleRange: [0.1, 1],
                fixedX: (x) => {
                    return x * 220.6825 - 250;
                },

                fixedY: (y) => {
                    return 2600 - y * 215.4892;
                },
            },
            {
                name: "四楼",
                src: "/src/assets/maps/3_2.jpg",
                imgWidth: "2595",
                imgHeight: "864",
                nodeRange: [211, 249],
                scaleRange: [0.1, 1],
                fixedX: (x) => {
                    return x * 220.6825 - 250;
                },

                fixedY: (y) => {
                    return 2600 - y * 215.4892;
                },
            },
            {
                name: "五楼",
                src: "/src/assets/maps/3_2.jpg",
                imgWidth: "2595",
                imgHeight: "864",
                nodeRange: [250, 288],
                scaleRange: [0.1, 1],
                fixedX: (x) => {
                    return x * 220.6825 - 250;
                },

                fixedY: (y) => {
                    return 2600 - y * 215.4892;
                },
            },
        ],
    },
];
