import React from "react";
import { Admin, Resource } from 'react-admin';
import { dataProvider, authProvider } from './configs/dataProvider';
import { JournalCreate, JournalEdit, JournalList } from './resources/Journals';
import { PaperCreate, PaperEdit, PaperList } from './resources/Papers';

function App() {
    return (
        <Admin dataProvider={dataProvider} authProvider={authProvider}>
            <Resource name="papers" options={{ label: "Research Papers" }} list={PaperList} create={PaperCreate} edit={PaperEdit} />
            <Resource name="journals" options={{ label: "Journals" }} list={JournalList} create={JournalCreate} edit={JournalEdit} />
        </Admin>
    );
}

export default App;
