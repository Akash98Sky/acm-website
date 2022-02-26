import React from 'react';
import { List, Datagrid, TextField, TextInput, Create, SimpleForm, Edit, DateField, EditButton, DateTimeInput, ArrayInput, SimpleFormIterator } from 'react-admin';

export function PaperList(props: any) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="subTitle" />
                <TextField source="url" />
                <DateField source="publishedOn" />
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
                <ArrayInput source="authors">
                    <SimpleFormIterator getItemLabel={(index) => `Author ${index + 1}.`}>
                        <TextInput label="Name" source="name" />
                        <TextInput label="ID" source="id" />
                    </SimpleFormIterator>
                </ArrayInput>
                <TextInput source="url" />
                <DateTimeInput source="publishedOn" />
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
                <ArrayInput source="authors">
                    <SimpleFormIterator getItemLabel={(index) => `Author ${index + 1}.`}>
                        <TextInput label="Name" source="name" />
                        <TextInput label="ID" source="id" />
                    </SimpleFormIterator>
                </ArrayInput>
                <TextInput source="url" />
                <DateTimeInput source="publishedOn" />
                <DateTimeInput disabled label="Last Update" source="lastupdate" />
            </SimpleForm>
        </Edit>
    );
}
