import { useContext } from "react"
import { Form } from "react-bootstrap"
import { AuthorContext } from "../context/AuthorContextProvider"

export const Me = () => {
    const AuthAuthor = useContext(AuthorContext)
    return (
        <Form>
            <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="name"
                    // onChange={HandleChange}
                    value={AuthAuthor.name}
                    required></Form.Control>
                <Form.Label>Cognome</Form.Label>
                <Form.Control type="text" name="surname"
                    // onChange={HandleChange} 
                    value={AuthAuthor.surname}
                    required></Form.Control>
                <Form.Label>e-mail</Form.Label>
                <Form.Control
                    type="text"
                    // type="email"
                    name="email"
                    // onChange={HandleChange}
                    value={AuthAuthor.email}
                    required
                ></Form.Control>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    // onChange={HandleChange}
                    value={AuthAuthor.password}
                    required
                ></Form.Control>
                <Form.Label>Data di nascita</Form.Label>
                <Form.Control
                    type="date"
                    name="birthDate"
                    // onChange={HandleChange}
                    value={AuthAuthor.birthDate}
                ></Form.Control>
                <Form.Group controlId="fileProPic" className="mb-3">
                    <Form.Label>Immagine di profilo</Form.Label>
                    <Form.Control
                        type="file"
                        // onChange={handlePicture}
                        value={AuthAuthor.avatar}
                    />
                </Form.Group>
                <img src={AuthAuthor.avatar} alt="Profile picture image" />
            </Form.Group>
        </Form>
    )
}