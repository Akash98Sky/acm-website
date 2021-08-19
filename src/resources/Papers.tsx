import React from 'react';
import { List, Datagrid, TextField, TextInput, Create, SimpleForm, Edit, DateField, EditButton, DateTimeInput } from 'react-admin';

export function PaperList(props: any) {
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

export function PaperCreate(props: any) {
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

export function PaperEdit(props: any) {
    return (
        <Edit {...props}>
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
