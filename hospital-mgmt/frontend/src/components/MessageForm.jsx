import React from 'react'
import { toast } from 'react-toastify'

const MessageForm = () => {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [message, setMessage] = React.useState('')

  const handleMessage = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://localhost:5000/api/v1/message/send", {
        firstName,
        lastName,
        email,
        phone,
        message
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      ).then((res) => {
        toast.success("response received" + res.data.message)
        setEmail('')
        setFirstName('')
        setLastName('')
        setPhone('')
        setMessage('')
      })
    } catch (error) {
      toast.error("Error sending message: " + error.res.data.message)
    }

  }


  return (
    <>
      <div className="container form-component message-form">
        <h2>Send a Message</h2>
        <form onSubmit={handleMessage}>
          <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="first Name"
            />

            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="last Name"
            />

          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />

            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="phone number"
            />


          </div>

          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="your message"
            />
          </div>

          <div style={{ justifyContent: 'center', display: 'flex' }}>
            <button type="submit">Send Message</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default MessageForm