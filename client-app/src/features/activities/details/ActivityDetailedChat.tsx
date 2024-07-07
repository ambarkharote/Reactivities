import { observer } from 'mobx-react-lite'
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Segment, Header, Comment, Form, Loader } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { Field, FieldProps, Formik } from 'formik';
import * as Yup from 'yup';
import { formatDistanceToNow } from 'date-fns';

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
            <Segment attached clearing>
            <Formik 
                    onSubmit={(values, {resetForm}) =>
                            commentStore.addComment(values).then(() => resetForm())}
                        initialValues={{body: ''}}
                        validationSchema={Yup.object({
                            body: Yup.string().required() 
                        })}
                    >
                        {({isSubnmitting, isValid, handleSubmit}) => (
                        <Form className='ui form'>
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{position:'relative'}} >
                                        <Loader active={isSubnmitting} />
                                        <textarea 
                                            placeholder='Enter your comment (Enter to submit, SHIFT + enter new line)'
                                            rows={2}
                                            {...props.field}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if(e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>

                                )}    
                            </Field>
                        </Form>
                        )}
                    </Formik>
                <Comment.Group>
                    {commentStore.comments.map((comment: { id: Key | null | undefined; image: any; username: any; displayName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; createdAt: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (  
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'}/>
                            <Comment.Content>
                            <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                                {comment.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                            <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                            </Comment.Metadata>
                            <Comment.Text style={{whiteSpace:''}}>{comment.body}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                    ))}
                    
                </Comment.Group>
            </Segment>
        </>

    )
})