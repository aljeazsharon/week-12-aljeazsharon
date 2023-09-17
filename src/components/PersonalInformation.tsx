import  React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {  Button, Input, Space } from 'antd';
import * as Yup from 'yup';

interface Props {
    NextStep: () => void;
}

interface UsersRegist {
    [key: string]: string;
    FullName: string,
    email: string,
    dOb: string,
}

const PersonalInformation: React.FC<Props>=({NextStep}) => {
    const [UsersRegist, setUsersRegist] = useState<UsersRegist> ({
        FullName:'',
        email:'',
        dOb:'',
})

    return (
        <div>
            <Formik initialValues={UsersRegist} validationSchema={Yup.object({
                FullName: Yup.string().required('You must enter your full name!'),
                email: Yup.string().email().required('enter right email format (name@example.com)'),
                dOb: Yup.date().required('DOB format (mm-dd-yyyy)')
            })}
                onSubmit={(values, { setSubmitting }) => {
                    if (Object.keys(values).some((key) => values[key] === '')) {
                      setSubmitting(false);
                    } else {
                      setUsersRegist({ ...UsersRegist, ...values });
                      NextStep();
                    }
                  }}
            >
            <Form>
                <div className='form-stepper'>
                    <label htmlFor= "FullName">Full Name</label>
                    <Field type="text" as={Input} id="FullName" name="FullName" className='field' rules={[{ required: true }]}/>
                    <ErrorMessage name="FullName" component="div"/>

                    <label htmlFor= "email">Email Address</label>
                    <Field type="email" as={Input} id="email" name="email" className='field' rules={[{ required: true }]}/>
                    <ErrorMessage name="email" component="div"/>
                    
                    <label htmlFor= "dOb">Date of Birth</label>
                    <Field type="date" as={Input} id="dOb" name="dOb" className='field' rules={[{ required: true }]}/>
                    <ErrorMessage name="dOb" component="div"/>
                </div>
                
                <Space wrap>
                    <Button type='primary' htmlType='submit' onSubmit={NextStep}>Next Page</Button>
                </Space>
        </Form>
    </Formik>
    </div>
)}

export default PersonalInformation