import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";

export default function HomePage() {
    const {userStore, modalStore} = useStore();
     return(
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}></Image>
                    Reactivites
                </Header>
                {userStore.isLoggedIn? (
                    <>
                    <Header as='h2' inverted content='Welcome to reactivities' />
                    <Button as={Link} to='/activities' size="huge" inverted />
                        Go to Activities
                    </>
                ) : (
                <>
                <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>
                     Login!
                 </Button><Button onClick={() => modalStore.openModal(<h1>Register</h1>)} size="huge">
                    Register
                 </Button>
                </>
                )}
            </Container>
        </Segment>
    )
}