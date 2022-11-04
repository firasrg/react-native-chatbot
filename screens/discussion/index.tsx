import * as React from 'react';
import {
    Platform,
    Image,
    TouchableOpacity,
    Alert,
    View,
    KeyboardAvoidingView,
    Text
} from 'react-native';
import {
    GiftedChat,
    IMessage,
    Reply,
    QuickRepliesProps,
    InputToolbar,
    Send
} from 'react-native-gifted-chat';

import { RootStackScreenProps } from "@app/types";
import { List } from "react-native-paper";
import {
    BusinessUtils,
    ChatConstants,
    DiscussionState
} from "./state";
import { IChatState } from "./model";
import styles from "./styles";
import messagesData from "./state/messagesData";
import { AppContext } from "@app/App";
import {
    setBotTyping,
    initialState
} from "./state/discussionSlice";


export default function ChatBotScreen( {navigation: _navigation}: RootStackScreenProps<'ChatScreen'> ) {

    const appCntxt = React.useContext( AppContext );
    
    const localInitialState: IChatState = {
        currentStepId: 0,
        messages: [],
        textInput: {
            shown: false,
            content: undefined
        }
    };
    const [reinitialized, setReinit] = React.useState<boolean>( false )
    const [chatState, setChatState] = React.useState<IChatState>(localInitialState )
    const [state, dispatch] = React.useReducer(DiscussionState.reducer, initialState);
    
    /** Using React useMemo() to translate all msgs **/
    const messagesDataMemo: Array<IMessage> = React.useMemo( () => messagesData, [reinitialized] );

    /** re/initialization effect **/
    React.useEffect( () => {

        const createdAt = new Date();

        // initialize UI with greeting msg from bot
        setTimeout( () =>
            setChatState( {
                ...chatState,
                messages: [
                    {
                        ...messagesDataMemo[0], 
                        createdAt
                    }
                ]
            } ), 2000 );

        // initialize UI with Screen right header to restart process
        _navigation.setOptions( {
            headerRight: () => (
                <TouchableOpacity
                    style={{paddingTop: "10%"}}
                    onPress={() => {
                        Alert.alert(
                            "Warning",
                            "Would you like to restart?",
                            [
                                {
                                    text: "Ok",
                                    onPress: () => {
                                        setChatState(localInitialState);
                                        setReinit( true );
                                    }
                                },
                                {text: "Cancel"}
                            ]
                        );
                    }}
                >
                </TouchableOpacity>
            )
        } );

        setReinit( false );

    }, [reinitialized] )

    /** Events **/
        // when the user presses on a quick-reply option
    const onQuickReply = ( replies: Array<Reply> ) => {

            dispatch(setBotTyping(1));

            const createdAt = new Date();

            const repliesHasOneItem: boolean = replies.length === 1;
            // const repliesHasMoreThanItem: boolean = replies.length > 1;

            if (repliesHasOneItem) {

                onSendMsg( [
                    {
                        _id: Math.round( Math.random() * 1000000 ),
                        text: replies[0].title,
                        user: BusinessUtils.INSURED,
                        createdAt,
                    }
                ]);

                setTimeout( () =>
                        botSend( replies[0].messageId ),
                    BusinessUtils.BOT_TYPING_DELAY_IN_SECONDS );

            } else {
                console.warn( 'replies param is not set correctly!' )
            }
        }

    // send msg handler
    const onSendMsg = ( messages: Array<IMessage> = [] ) => {

        let latestMsg = null;
        let textInputContent = null;

        // the following means the msg is not a quick-reply
        if (typeof messages[0]._id === "string") {
            dispatch(setBotTyping(1));
            
            setChatState( {
                ...chatState,
                textInput: {
                    ...chatState.textInput,
                    content: messages[0].text
                }
            });

            const arrCopy = [...chatState.messages];

            latestMsg = arrCopy[0];
            textInputContent = messages[0].text;

            // console.log("msg content: ", messages[0].text);
        }

        setChatState( ( previousState: IChatState ) => {

            const sentMessages: Array<IMessage> = [
                {
                    ...messages[0],
                    sent: true,
                    received: true
                }
            ];

            return {
                ...previousState,
                messages: GiftedChat.append(
                    previousState.messages,
                    sentMessages,
                    Platform.OS !== 'web',
                ),
                textInput: {
                    ...previousState.textInput,
                    shown: false
                },
                currentStepId: messages[0]._id
            }
        } );

        if (latestMsg && textInputContent) {
            autoMsgAfterNoReply( latestMsg.decision, textInputContent );
        }
    }

    // bot send msg handler
    const botSend = ( nextStepId: number, repliesToAvoid?: Reply[] ) => {

        // bot next task lookup mecanism
        let nextBotMessage: IMessage = BusinessUtils.botNextStepLookup(
            messagesDataMemo,
            nextStepId
        ) as IMessage;

        if (nextBotMessage) {

            const msg = BusinessUtils.msgAvoidQuickReplies( nextBotMessage, repliesToAvoid );

            const createdAt: Date = new Date();

            dispatch(setBotTyping(0));
            
            setChatState( (previousState: IChatState) =>
                ({
                    ...previousState,
                    messages: GiftedChat.append(
                        previousState.messages,
                        [{...msg, createdAt}],
                        Platform.OS !== 'web',
                    )
                })
            )

            autoMsgAfterNoReply( nextStepId );
        }
    }

    // After bot msg without quick reply handler
    // TODO - needs more care & improvements
    function autoMsgAfterNoReply( id: number, textContent?: string ) {

        const {MessageID} = ChatConstants;

        const timeToWait: number = BusinessUtils.BOT_TYPING_DELAY_IN_SECONDS + 1000;

        // actions to do based on specific ids
        switch (id) {
            case MessageID.MESSAGE_SIGNUP_ID:
                setTimeout( () => {

                        setChatState( currentState => {

                            return {
                                ...currentState,
                                textInput: {
                                    ...currentState.textInput,
                                    shown: true
                                }
                            }
                        } )
                    },
                    timeToWait - 2000
                );
                break;

            case MessageID.MESSAGE_CHECK_PROFILE_ID:
                setTimeout( () => {

                        const {profile} = appCntxt;
                        // const { textInput } = chatState;

                        console.log( "text input value :", textContent );

                        if (profile == textContent)
                            botSend( MessageID.MESSAGE_GO_TO_PROFILE_ID );

                        else {
                            botSend( MessageID.MESSAGE_PROFILE_NOT_FOUND_ID );
                        }
                    },
                    timeToWait
                );
                break;

            case MessageID.MESSAGE_PROFILE_NOT_FOUND_ID:
                setTimeout( () => {
                        botSend( MessageID.MESSAGE_SOMETHING_ELSE_ID );
                    },
                    timeToWait
                );
                break;

            case MessageID.MESSAGE_GO_TO_PROFILE_ID:
                setTimeout( () => {
                        _navigation.navigate( "Modal" );
                    },
                    timeToWait
                );
                break;

            case MessageID.MESSAGE_QUIT_ID:
                setTimeout( () => {
                        _navigation.goBack();
                    },
                    timeToWait
                );
                break;

        }
    }

    /** rendering **/
    function buildQuickReplies(quickReplies: QuickRepliesProps ): React.ReactNode {

        if (!quickReplies.nextMessage?.received) {

            const replies: Reply[] | undefined = quickReplies.currentMessage?.quickReplies?.values;

            if (replies) {

                return replies.map( ( q ) => (
                        <List.Item
                            {...quickReplies}
                            key={q.value}
                            onPress={() => onQuickReply( [q] )}
                            style={styles.quickReplyItem}
                            title={q.title}
                            titleStyle={styles.quickReplyText}
                        />
                    )
                )
            }

            return React.Fragment;
        }
    }

    const {
        shown: textInputShown,
        content: textInputContent
    } = chatState.textInput;

    return (
        <View style={styles.container}>
            <GiftedChat
                text={textInputContent}
                user={BusinessUtils.INSURED}
                messages={chatState.messages}
                isTyping={state.botIsTyping}
                shouldUpdateMessage={() => true}
                scrollToBottom={true}
                alignTop={true}
                renderAvatarOnTop={true}
                inverted={Platform.OS !== 'web'}
                onSend={onSendMsg}
                onQuickReply={onQuickReply}
                renderQuickReplies={buildQuickReplies}
                renderAvatar={() => {
                    return (
                        <Image
                            source={{uri: BusinessUtils.BOT_USER_IMG_URI}}
                            style={styles.botAvatarImg}
                        />)
                }}

                renderInputToolbar={( props ) => {
                    return textInputShown ? <InputToolbar {...props}/> : null;
                }}
                renderSend={( props ) => {
                    return textInputShown ? <Send {...props} /> : null;
                }}
                renderTime={( timeProps ) => (
                    <View style={{
                        flex: 1,
                        alignItems: timeProps.position === "left" ? "flex-end" : "flex-start",
                        marginHorizontal: "5%"
                    }}>
                        <Text
                            style={{
                                color: timeProps.position === "left" ? "#0079B1" : "#FFF",
                                fontSize: 16,
                            }}
                        >
                            {
                                BusinessUtils.formatTimeBasedOnLanguage( timeProps, "en" )
                            }
                        </Text>
                    </View>
                )}
                parsePatterns={BusinessUtils.parsePatterns}
                messagesContainerStyle={styles.msgContainer}
                quickReplyStyle={styles.quickReply}
            />
            {
                Platform.OS === 'android' && <KeyboardAvoidingView behavior="height"/>
            }
        </View>
    )
}


