import React from 'react'

const Profile = ({user}) => {

    console.log(user)
  return (
    <section className='text-center'>
        name : {user.name}
        email : {user.email}
        role : {user.role}
        skills : {user.skills}
    </section>
  )
}

export default Profile