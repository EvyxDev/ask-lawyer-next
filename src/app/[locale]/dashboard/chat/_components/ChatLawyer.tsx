/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import { useMutation, useQuery } from "@tanstack/react-query";
import ChatSkeleton from "../_components/ChatSkeleton";
import { getChats, sendMessageUser } from "@/lib/apis/chat";
import {  getRequestLawyer } from "@/lib/apis/user-requests";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";

interface ChatLawyerProps {
  chatId: string;
}

const ChatLawyer: React.FC<ChatLawyerProps> = ({ chatId }) => {

  const [firebaseMessages, setFirebaseMessages] = React.useState<
    FirebaseMessage[]
  >([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
 const { data: session, status } = useSession();
  const token = session?.user.token;
  const userId = session?.user.id;
  const locale = useLocale();
console.log("token", token)
  const { data: chatRequestData, isLoading: chatisApiLoading } =
    useQuery<HireRequestResponse>({
      queryKey: ["chat-request", chatId],
      queryFn: () => getRequestLawyer(locale,"chat",chatId, token),
      enabled: !!chatId,
    });
  // Fetch API messages
  const {
    data: chatData,
    isLoading: isApiLoading,
    isError,
    error,
  } = useQuery<ActivitiesResponse>({
    queryKey: ["chat", chatId],
    queryFn: () => getChats({ chatId }),
    enabled: !!chatId,
  });

  React.useEffect(() => {
    if (!chatId) return;

    const messagesRef = ref(db, `chat_rooms/${chatId}/messages`);
    const unsubscribe = onValue(
      messagesRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const loadedMessages = Object.entries(data).map(
            ([key, value]: [string, any]) => ({
              id: key,
              ...value,
            })
          ) as FirebaseMessage[];
          loadedMessages.sort((a, b) => a.timestamp - b.timestamp);
          setFirebaseMessages(loadedMessages);
        } else {
          setFirebaseMessages([]);
        }
      },
      (error) => {
        console.error("Firebase error:", error);
        setErrorMessage("Failed to load Firebase messages");
      }
    );

    return () => unsubscribe();
  }, [chatId]);

  // Combine and deduplicate messages
  const messages: Message[] = React.useMemo(() => {
    // Map API messages
    const apiMessages: Message[] =
      chatData?.success && chatData.messages
        ? chatData.messages.map((msg) => ({
            id: `api-${msg.id}`,
            sender: msg.is_sent_by_me ? "You" : "User",
            content: msg.message,
            timestamp: msg.timestamp,
            isCurrentUser: msg.is_sent_by_me,
          }))
        : [];

    const firebaseMappedMessages: Message[] = firebaseMessages.map((msg) => ({
      id: `fb-${msg.id || Date.now()}`,
      sender: msg.is_sent_by_me ? "You" : "User",
      content: msg.message,
      timestamp: new Date(msg.timestamp * 1000).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      isCurrentUser: msg.is_sent_by_me,
    }));

    // Combine and deduplicate by ID
    const combinedMessages = [...apiMessages, ...firebaseMappedMessages];
    const uniqueMessages = Array.from(
      new Map(combinedMessages.map((msg) => [msg.id, msg])).values()
    );

    // Sort by timestamp
    return uniqueMessages.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateA - dateB;
    });
  }, [chatData, firebaseMessages]);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: sendMessageUser,
    onSuccess: (response: SendMessageResponse) => {
      if (response.success) {
        setNewMessage("");
      }
    },
    onError: (error) => {
      console.error("Failed to send message:", error);
      setErrorMessage("Failed to send message");
    },
  });

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      senderable_type: "App\\Models\\Lawyer",
      senderable_id: userId,
      receiverable_type: "App\\Models\\User",
      receiverable_id: chatRequestData?.data.user_id as number,
      message: newMessage,
      request_id: Number(chatId),
      request_source: "UserRequest",
      sender: "lawyer",
    };

    sendMessageMutation.mutate(messageData);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="w-full h-full">
      <div
        className={cn(
          "flex flex-col h-[80vh] w-full max-w-5xl mx-auto bg-background border rounded-lg shadow-lg relative"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b bg-muted/50">
          <h2 className="text-lg font-semibold">
            Chat with{" "}  {messages.length > 0
              ? messages[0].sender === "You"
                ? "User"
                : "User"
              : "Contact"}
          </h2>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {isApiLoading &&
            firebaseMessages.length === 0 &&  status === "loading" &&
            chatisApiLoading ? (
              <ChatSkeleton />
            ) : isError || errorMessage ? (
              <div className="text-center text-red-500">
                {errorMessage ||
                  `Error loading API messages: ${
                    error?.message || "Unknown error"
                  }`}
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No messages yet.
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.isCurrentUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-start gap-2 max-w-[70%]",
                      message.isCurrentUser ? "flex-row-reverse" : ""
                    )}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage alt={message.sender} />
                      <AvatarFallback>
                        {message.sender.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        "rounded-lg p-3",
                        message.isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-white"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {message.sender}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-background">
          <div className="flex items-center gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              disabled={sendMessageMutation.isPending}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatLawyer;
