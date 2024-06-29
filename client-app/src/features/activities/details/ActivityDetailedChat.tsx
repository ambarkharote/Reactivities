import { observer } from 'mobx-react-lite'
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Segment, Header, Comment, Button, Form } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

interface Props {
    activityId : string;
}

export default observer(function ActivityDetailedChat({activityId} : Props) {
    const {commentStore} = useStore();

    useEffect(() => {
        if(activityId) {
            commentStore.createHubConnection(activityId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, activityId]);

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    {commentStore.comments.map((comment: { id: Key | null | undefined; image: any; username: any; displayName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; createdAt: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (  
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'}/>
                            <Comment.Content>
                            <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                                {comment.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                            <div>{comment.createdAt}</div>
                            </Comment.Metadata>
                            <Comment.Text>How artistic!</Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                    ))}

                    <Form reply>
                        <Form.TextArea/>
                        <Button
                            content='Add Reply'
                            labelPosition='left'
                            icon='edit'
                            primary
                        />
                    </Form>
                </Comment.Group>
            </Segment>
        </>

    )
})