import React, { createContext, useState } from "react";
import { searchEventsApi } from "../api/eventApi";
import { minutesToDate } from "../utils/calDate";

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
    // filter
    const [filterLabels, setFilterLabels] = useState([false, false, false]);
    // time
    const emptyData = {
        startMinute: 0,
        endMinute: 288,
        startMonth: 0,
        startDate: 1,
        endMonth: 11,
        endDate: 30,
    };
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [submitData, setSubmit] = useState(emptyData);
    const changeData = (dataObject) => {
        const newData = structuredClone(submitData);
        for (const prop in dataObject) {
            newData[prop] = dataObject[prop];
        }
        setSubmit(newData);
    };
    const dataToTime = (data) => {
        const {
            startMinute,
            endMinute,
            startMonth,
            startDate,
            endMonth,
            endDate,
        } = data;
        const sDate = minutesToDate(startMinute);
        sDate.setMonth(startMonth);
        sDate.setDate(startDate);
        const eDate = minutesToDate(endMinute);
        eDate.setMonth(endMonth);
        eDate.setDate(endDate);
        return { startTime: sDate.getTime(), endTime: eDate.getTime() };
    };
    const saveTimeChange = () => {
        const { startTime: newStartTime, endTime: newEndTime } =
            dataToTime(submitData);
        setStartTime(newStartTime);
        setEndTime(newEndTime);
    };
    // other
    const [category, setCategory] = useState(0);
    const [doLoop, setDoLoop] = useState(0);

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

    const toggleFilterLabels = (index) => {
        const newLabels = [...filterLabels];
        newLabels[index] = !filterLabels[index];
        setFilterLabels(newLabels);
    };

    const clearResult = () => {
        setSearchResult([]);
    };

    return (
        <SearchContext.Provider
            value={{
                // searchLabelRange
                searchLabels,
                toggleSearchLabels,
                // filter
                category,
                setCategory,
                doLoop,
                setDoLoop,
                startTime,
                endTime,
                submitData,
                changeData,
                saveTimeChange,
                filterLabels,
                searchResult,
                // search Mode
                searchMode,
                setSearchMode,
                // result
                searchEvent,
                toggleFilterLabels,
                clearResult,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}
