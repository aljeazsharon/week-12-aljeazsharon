import React, { useState } from 'react'
import PersonalInformation from './PersonalInformation'
import AddressInformation from './AddressInformation'
import AccountInformation from './AccountInformation'
import { Steps } from 'antd'

interface UsersRegist {
  FullName: string;
  email: string;
  dOb: string;
  street: string;
  city: string;
  state: string;
  ZipCode: string;
  username: string;
  password: string;
}

const MultiStepRegist: React.FC = () => {
  const [Steper, setSteper] = useState<number>(0);
  const [UsersRegist, setUsersRegist] = useState<UsersRegist>({
    FullName: '',
    email: '',
    dOb: '',
    street: '',
    city: '',
    state: '',
    ZipCode: '',
    username: '',
    password: '',
  })

  const handleNext = () => {
    setSteper(Steper + 1);
  }

  const handlePrev = () => {
    setSteper(Steper - 1);
  }

  const handleData = (data: Partial<UsersRegist>) => {
    setUsersRegist({ ...UsersRegist, ...data });
  }

  const Multistepper = [
    {
      title: 'Personal Information'
    },
    {
      title: 'Address Information'
    },
    {
      title: 'Account Information'
    }
  ]

  const items = Multistepper.map((item) => ({key: item.title, title: item.title}))

  return (
    <>
      <Steps current={Steper} items={items}/> 
      <div>
        {Steper === 0 && <PersonalInformation NextStep={handleNext}/>}
        {Steper === 1 && <AddressInformation PrevStep={handlePrev} NextStep={handleNext} />}
        {Steper === 2 && <AccountInformation PrevStep={handlePrev} onSubmit={handleData} />}
      </div>       
    
    </>
    
  )
}
export default MultiStepRegist