/*
Holds the current question set during gameplay
*/
window.questions = [ // question first, then right answers and then wrong answers
    
]

/*
Holds the data for each level.
*/

//let max speed not exceed 4.
//let colors be same for similar levels. 
window.levels = [
    //level 1
    {
        rowCount : 2,
        colors : ["#9999FF","#666699","#333399","#111166"],
        dx : 2,
        dy : -2,
        answerSpeed: 2,
        //more questions can always be added.. the order matters
        questions: [
            ["How many tens does 21 have?", "2", "1", "0", "3"],
            ["How many tens does 237 have?", "3", "7", "2", "0"],
            ["How many ones does 99 have?", "9", "1", "0", "2"],
            ["How many ones does 23 have?", "3", "1", "2", "0"],
            ["How many hundreds does 23 have?", "0", "2", "3", "4"],
        ]
    },
    //level 2
    {
        rowCount : 2,
        colors : ["#9999FF","#666699","#333399","#111166"],
        dx : 2,
        dy : -2,
        answerSpeed: 2,
        //more questions can always be added.. the order matters
        questions: [
            ["Out of 23, 24, 99 and 45, which is greatest number?", "99", "23", "24", "45"],
            ["Out of 23, 24, 9 and 45, which is least number?", "9", "24", "23", "45"],
            ["How many thousands does 92319 have?", "2", "3", "9", "1"],
            ["Out of 23, 24, 99 and 45, which is the even number?", "24", "23", "45", "99"],
            ["Out of 22, 25, 98 and 46, which is the odd number?", "25", "22", "98", "46"]
        ]
    },
    //level 3
    {
        rowCount : 2,
        colors : ["#99FF99","#669966","#339933","#116611"],
        dx : 2.5,
        dy : -2.5,
        answerSpeed: 2.5,
        questions: [
            ["21 + 1", "22", "24", "14", "23"],
            ["18 - 11", "7", "6", "8", "10"],
            ["8 * 7", "56", "54", "58", "70"],
            ["84 / 4", "21", "22", "19", "24"],
            ["12 - 29", "-17", "17", "16", "-16"]
        ]
    },
    //level 4
    {
        rowCount : 3,
        colors : ["#99FF99","#669966","#339933","#116611"],//["#FF9999","#FF6666","#FF6633","#FF3311"],
        dx : 2.5,
        dy : -2.5,
        answerSpeed: 2.5,
        questions: [
            ["Peter has 10$. He gives 2$ to Rose. How much does Peter have now?", "8$", "2$", "1$", "10$"],
            ["Rose bought 12 eggs. She eats 3 eggs. How many eggs does she have now?", "9", "6", "8", "10"],
            ["Rose ate 3 eggs in the morning. She eats 2 more at noon. How many eggs did she eat?", "5", "6", "4", "3"],
            ["A container weighs 5 pound. 16 pounds of rice was put in it. How many pounds does it weigh now? ", "21", "20", "16", "19"],
            ["The school starts at 8am and ends at 1pm. How many hours does a student spend in school?", "5", "6", "4", "3"]
        ]
    },
    //level 5
    {
        rowCount : 3,
        colors : ["#99FF99","#669966","#339933","#116611"],//["#123456","#234567","#345678","#456789"],
        dx : 2.5,
        dy : -2.5,
        answerSpeed: 2.5,
        questions: [
            ["Mary has 10 pencils. She gives half of them to Lily. How many pencils does Mary have now?", "5", "10", "4", "0"],
            ["Andrew's 4 friends were coming over. He made 3 sandwiches each. How many did he make in total?", "12", "6", "8", "10"],
            ["A room has 5 rows of chairs with 3 chairs in each row. How many chairs are there?", "15", "35", "19", "14"],
            ["80 crayons are placed into 5 crayon boxes. How many crayons are in each box?", "16", "400", "20", "24"],
            ["Lexi studies 2hrs per subject. She studies for 8hrs. How many subjects does she have?", "4", "16", "6", "14"]
        ]
    },
    //level 6
    {
        rowCount : 3,
        colors : ["#FF9999","#FF6666","#FF6633","#FF3311"],//["#FFFF99","#FF9966","#FF9933","#FF6611"],
        dx : 2.5,
        dy : -2.5,
        answerSpeed: 2.5,
        questions: [
            ["20 - 10 + 7", "17", "16", "19", "27"],
            ["(8 * 11) - 10", "78", "87", "77", "98"],
            ["(8 / 2) * 3", "12", "14", "10", "11"],
            ["20 + (21 / 7)", "23", "22", "19", "24"],
            ["(12 - 29) * 3", "-51", "51", "-57", "-53"]
        ]
    },
    //level 7
    {
        rowCount : 3,
        colors : ["#FF9999","#FF6666","#FF6633","#FF3311"],//["#FF9999","#996666","#666633","#663311"],
        dx : 3,
        dy : -3,
        answerSpeed: 3,
        //misc questions
        questions: [
            ["23, 24, 99 and 45 - Find the difference between the greatest and least numbers.", "76", "75", "21", "20"],
            ["35, 21, 12 and 36 - Find the sum of the greatest and least numbers.", "48", "46", "56", "47"],
            ["35, 21, 12 and 36 - Add all these numbers.", "104", "100", "110", "106"],
            ["35, 21, 12 and 36 - Find the sum of all even numbers.", "48", "46", "56", "47"],
            ["67, 32, 694, 633 - Find the sum of all odd numbers", "700", "726", "724", "702"]
        ]
    },
    //level 8
    {
        rowCount : 4,
        colors : ["#123456","#234567","#345678","#456789"],
        dx : 3,
        dy : -3,
        answerSpeed: 3,
        questions: [
            ["A factor of 21 is __", "3", "2", "9", "6"],
            ["A factor of 83 is __", "1", "21", "23", "11"],
            ["A multiple of 7 is __", "343", "341", "351", "345"],
            ["A multiple of 11 is __", "231", "232", "233", "224"],
            ["A multiple of both 3 and 13 is __", "78", "77", "76", "16"]
        ]
    },
    //level 9
    {
        rowCount : 4,
        colors : ["#123456","#234567","#345678","#456789"],
        dx : 3,
        dy : -3,
        answerSpeed: 3,
        questions: [
            ["Least Common Factor of 34 and 4 is __", "2", "4", "8", "17"],
            ["Least Common Factor of 84 and 63 is __", "3", "21", "9", "7"],
            ["Highest Common Factor of 84 and 63 is __", "21", "3", "9", "7"],
            ["Least Common Multiple of 3 and 13 is __", "39", "78", "76", "13"],
            ["Least Common Multiple of 34 and 4 is __", "68", "78", "136", "140"]
        ]
    },
    //level 10
    {
        rowCount : 4,
        colors : ["#344354","#543443","#435434","#453344"], 
        dx : 3.5,
        dy : -3.5,
        answerSpeed: 3.5,
        questions: [
            ["What comes next in the series (AP) 2, 4, 6, __", "8", "10", "12", "7"],
            ["What comes next in the series (AP) -1, 4, 9, __", "14", "13", "-13", "-14"],
            ["What comes next in the series (AP) -2, -17, -32, __", "-47", "-45", "-49", "-44"],
            ["If a series starts from 7 with a difference of 3 between the numbers, what will be the 8th number?", "28", "31", "25", "27"],
            ["If a series starts from -4 with a difference of 5 between the numbers, what will be the 5th number?", "16", "17", "11", "21"]
        ]
    },
    //level 11
    {
        rowCount : 5,
        colors : ["#344354","#543443","#435434","#453344"], //is the same as level 10
        dx : 3.5,
        dy : -3.5,
        answerSpeed: 3.5,
        questions: [
            ["What comes next in the series (GP) 2, 4, 8, __", "16", "10", "12", "18"],
            ["What comes next in the series (GP) 625, 125, 25, __", "5", "15", "10", "20"],
            ["What comes next in the series (GP) -3, 6, -12, __", "24", "18", "-18", "-24"],
            ["What comes next in the series (GP) -128, 64, -32, __", "16", "-16", "14", "-14"],
            ["What is the probability of getting a double when rolling 2 square dice?", "1/6", "1/3", "1/36", "3/4"]
        ]
    },
    //level 12
    {
        rowCount : 6,
        colors : ["#414223","#632364","#624526","#873452"], //unique!
        dx : 4,
        dy : -4,
        answerSpeed: 4,
        questions: [
            ["What is the area of a semi-circle with radius 7 units?", "22", "21", "14", "28"],
            ["What is the volume of a cube with a side of 6 units?", "216", "214", "236", "36"],
            ["A room has 5 rows of chairs with 3 chairs in each row. How many chairs are there?", "15", "35", "19", "14"],
            ["80 crayons are placed into 5 crayon boxes. How many crayons are in each box?", "16", "18", "20", "24"],
            ["What is the surface area of a cylinder with radius 7 and height 10?", "748", "451", "832", "758"]
        ]
    }
]
