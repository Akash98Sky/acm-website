// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiResponse, NextApiRequest } from 'next';

const journals = [
    {
        "title": "“Multi-Criteria Decision Tree Approach to Classify All- rounder in Indian Premier League”, in International Journal of Advanced Science and Technology (IJAST-SERSC), ISSN: 2005- 4238, Vol. 52, pp-93-100.",
        "subTitle": "by Pabitra Kumar Dey, Dipendra Nath Ghosh and Abhoy Chand Mondal",
        "url": "http://www.sersc.org/journals/IJAST"
    },
    {
        "title": "“Multi-Criteria Decision Tree Approach to Classify All- rounder in Indian Premier League”, in International Journal of Advanced Science and Technology (IJAST-SERSC), ISSN: 2005- 4238, Vol. 52, pp-93-100.",
        "subTitle": "by Pabitra Kumar Dey, Dipendra Nath Ghosh and Abhoy Chand Mondal"
    }
];

export default (_req: NextApiRequest, res: NextApiResponse) => {
    res.statusCode = 200;
    res.json({ journals });
};
