import React, { createContext, useState } from "react";
import { searchEventsApi } from "../api/eventApi";

export const SearchContext = createContext();

export default function SearchContextProvider({ children }) {
    /**Search State */
    /**
     * Keywork List: a list of properties that should search
     * searchLabels: keywords to search
     * searchResult: a list of events
     */
    // three: title, location, participants
    const [searchLabels, setSearchLabels] = useState([true, false, false]);
    // mode: and(0), or(1)
    const [searchMode, setSearchMode] = useState(0);
    const [searchResult, setSearchResult] = useState([]);

    /**TODO: Add params. This is just a mocking */
    const searchEvent = async (keyWordList) => {
        const { data } = await searchEventsApi(keyWordList, searchLabels);
        setSearchResult(data);
    };

    const toggleSearchLabels = (index) => {
        const newLabels = [...searchLabels];
        newLabels[index] = !searchLabels[index];
        setSearchLabels(newLabels);
    };

    const clearResult = () => {
        setSearchResult([]);
    };

    return (
        <SearchContext.Provider
            value={{
                // search
                searchLabels,
                searchResult,
                searchMode,
                setSearchMode,
                searchEvent,
                toggleSearchLabels,
                clearResult,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}
