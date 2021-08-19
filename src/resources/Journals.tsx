import React from 'react';
import { List, Datagrid, TextField, TextInput, Create, SimpleForm, Edit, DateField, EditButton, DateTimeInput } from 'react-admin';

export function JournalList(props: any) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="subTitle" />
                <TextField source="url" />
                <DateField label="Last Update" source="lastupdate" />
                <EditButton />
            </Datagrid>
        </List>
    );
}

export function JournalCreate(props: any) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="title" />
                <TextInput source="subTitle" />
                <TextInput source="url" />
                <DateTimeInput label="Last Update" source="lastupdate" />
            </SimpleForm>
        </Create>
    );
}

export function JournalEdit(props: any) {
    console.log(props);

    const JournalTitle = () => {
        return <span>Journal 1</span>;
    };

    return (
        <Edit title={<JournalTitle />} {...props}>
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="title" />
                <TextInput source="subTitle" />
                <TextInput source="url" />
                <DateTimeInput label="Last Update" source="lastupdate" />
            </SimpleForm>
        </Edit>
    );
}
