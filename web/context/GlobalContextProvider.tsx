"use client";
import React, { useState } from "react";

interface GlobalProviderProps {
  children?: React.ReactNode;
}

interface GlobalContextProps {
  currentUserDetails: any;
  setCurrentUserDetails: (userDetails: any) => void;
  fileUploading: any;
  setFileUploading: (fileUploading: any) => void;
  chatDocuments: any[];
  setChatDocuments: (chatDocuments: any[]) => void;
  selectedSources: any[];
  setSelectedSources: (selectedSources: any[]) => void;
  chatMessages: any[];
  setChatMessages: (chatMessages: any[]) => void;
  chatNotes: any[];
  setChatNotes: (chatNotes: any[]) => void;
  chat: any;
  setChat: (chat: any) => void;
}

const GlobalContext = React.createContext<GlobalContextProps | null>(null);

export const useGlobalContext = () => {
  const state = React.useContext(GlobalContext);
  if (!state) throw new Error("State Is Undefined");

  return state;
};

export const GlobalContextProvider: React.FC<GlobalProviderProps> = ({
  children,
}) => {
  const [currentUserDetails, setCurrentUserDetails] = useState<any>(null);
  const [fileUploading, setFileUploading] = useState<any>(null);
  const [chatDocuments, setChatDocuments] = useState<any[]>([]);
  const [selectedSources, setSelectedSources] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatNotes, setChatNotes] = useState<any[]>([]);
  const [chat, setChat] = useState<any>(null);
  return (
    <GlobalContext.Provider
      value={{
        currentUserDetails,
        setCurrentUserDetails,
        fileUploading,
        setFileUploading,
        chatDocuments,
        setChatDocuments,
        selectedSources,  
        setSelectedSources,
        chatMessages,
        setChatMessages,
        chatNotes,
        setChatNotes,
        chat,
        setChat,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
