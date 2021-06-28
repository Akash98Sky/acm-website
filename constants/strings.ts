import { EducationModel } from '../models/info_models';

const name = {
    first: 'Abhoy',
    middle: 'Chand',
    last: 'Mondal',
    full: 'Abhoy Chand Mondal'
};

const details = {
    avatarUrl: '/avatar.jpeg',
    teaching: {
        designation: 'Professor',
        department: 'Dept. of Computer Science',
        university: 'The University of Burdwan',
        degrees: ['M.Sc.', 'M.C.A.', 'Ph.D.']
    },
    dob: '27 February, 1964',
    contact: {
        mail: 'abhoy_mondal@yahoo.co.in',
        ph_no: '9434386968',
        alt_ph_no: '7001838087',
    },
    languages: 'English, Bengali, Hindi (speak)',
    correspondanceAddress: `Dept. of Computer Science,
The University of Burdwan,
Golapbag, Burdwan 713104,
West Bengal`,
};

const positions = [];

const educations: EducationModel[] = [
    {
        year: '2004',
        degree: 'Ph.D. in Computer Science',
        from: 'The University of Burdwan'
    },
    {
        year: '1992',
        degree: 'M.C.A.',
        from: 'Jadavpur University'
    },
    {
        year: '1989',
        degree: 'M.Sc. in Mathematics',
        from: 'Jadavpur University'
    },
    {
        year: '1987',
        degree: 'B.Sc. in Mathematics',
        from: 'The University of Burdwan'
    }
];

const research = {
    interests: [
        { name: 'Natural Language Processing', bg: 'https://insights.daffodilsw.com/hs-fs/hubfs/Archna/Pre-trained%20NLP%20model.png?width=700&name=Pre-trained%20NLP%20model.png' },
        { name: 'Information Retrieval', bg: 'https://cdn.analyticsvidhya.com/wp-content/uploads/2020/08/Untitled-design3-2048x1365.png' },
        { name: 'Sentiment Analysis', bg: 'https://d1sjtleuqoc1be.cloudfront.net/wp-content/uploads/2019/04/25112909/shutterstock_1073953772-860x574.jpg' },
        { name: 'Opinion Mining', bg: 'https://www.meaningcloud.com/wp-content/uploads/2015/02/176964464-reduced.jpg' },
        { name: 'Soft Computing', bg: 'https://www.hitechnectar.com/wp-content/uploads/2019/05/Applications-of-Soft-Computing.jpg' },
        { name: 'Fuzzy Logic', bg: 'https://i1.wp.com/www.infoclusters.com/wp-content/uploads/2019/09/fuzzy.png?resize=768%2C407&ssl=1' },
        { name: 'Neural Networks', bg: 'https://resources.appen.com/wp-content/uploads/2018/03/Recent-Developments-in-Neural-Networks.png.webp' },
        { name: 'Big Data Analytics', bg: 'https://itchronicles.com/wp-content/uploads/2020/08/big-data-analysis-1024x576.jpg.webp' }
    ],
    scholars: [],
    phd_awardees: []
};

const strings = {
    name,
    details,
    research,
    educations,
    positions
};

export default strings;