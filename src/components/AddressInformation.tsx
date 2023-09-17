import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { Field, Formik, Form ,ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface Props {
    PrevStep: () => void
    NextStep: () => void
}

interface UsersRegist {
    [key: string]: string;
    street: string,
    city: string,
    state: string,
    ZipCode: string,
}

const AddressInformation: React.FC<Props> = ({PrevStep, NextStep}) => {
    const [UsersRegist, setUsersRegist] = useState<UsersRegist> ({
        street: '',
        city: '',
        state: '',
        ZipCode: '',
    })

    return(
        <div>
            <Formik initialValues={UsersRegist} validationSchema={Yup.object().shape({
                street: Yup.string().required(),
                city: Yup.string().required(), 
                state: Yup.string().required(), 
                ZipCode: Yup.string().matches(/^\d{5}$/, 'Required! 5 digits only').required(),})}
                onSubmit={(values, {setSubmitting}) => {

                if(Object.keys(values).some((key) => values[key] === '')) {
                    setSubmitting(false)
                }
                else {
                    setUsersRegist({...UsersRegist, ...values})
                    NextStep()
                }
            }}
            >
                <Form>
                    <div className='form-stepper'>
                        <label htmlFor='street'>Street Address:</label>
                        <Field type="text" id="street" name="street" as={Input} className='field' rules={[{ required: true }]}/>
                        <ErrorMessage name="street" component="div" className="Error Message"/>
                   
                        <label htmlFor='city'>City:</label>
                        <Field type="text" id="city" name="city" as={Input} className='field' rules={[{ required: true }]}/>
                        <ErrorMessage name="city" component="div" className="Error Message"/>
                   
                        <label htmlFor='state'>State:</label>
                        <Field type="text" id="state" name="state" as={Input} className='field' rules={[{ required: true }]}/>
                        <ErrorMessage name="state" component="div" className="Error Message"/>
                    
                        <label htmlFor='ZipCode'>Zip Code:</label>
                        <Field type="text" id="ZipCode" name="ZipCode" as={Input} className='field' rules={[{ required: true }]}/>
                        <ErrorMessage name="ZipCode" component="div" className="Error Message"/>
                    </div>

                    <Space wrap>
                        <Button onClick={PrevStep}>Previous Page</Button>
                        <Button type='primary' htmlType='submit' onSubmit={NextStep}>Next Page</Button>
                    </Space>
                </Form>
            </Formik>
        </div>
    )
}

export default AddressInformation