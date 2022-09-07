import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";
import jsonData from "../../data/characters.json";
import type { Character, SelectedCharatersProps } from "../../types";
import CharacterListRow from "./CharacterListRow";
const data: Character[] = jsonData as Character[];

type CharacterListProps = {
  searchedCharachter: string;
  handleSelectedChar: (
    name: string,
    img: string,
    power: number,
    mobility: number,
    technique: number,
    survivability: number,
    energy: number
  ) => void;
  teamLength: number;
  setRemoveCharacter: (name: string) => void;
  selectedTags: string[];
  selectedCharacterArray: SelectedCharatersProps[];
};

const CharacterList = ({
  searchedCharachter,
  teamLength,
  handleSelectedChar,
  setRemoveCharacter,
  selectedTags,
  selectedCharacterArray,
}: CharacterListProps) => {
  const [characterList, setCharaterList] = useState<Character[]>(data);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  useEffect(() => {
    if (teamLength > 5) {
      setIsDisabled(true);
    } else if (teamLength < 6) {
      setIsDisabled(false);
    }
  }, [teamLength]);

  const getFilteredCharacters = useCallback(
    (data: Character[], isDisableTagSearch: boolean) => {
      if (searchedCharachter !== "") {
        let filteredCharaters: Character[] = [];
        data.forEach((val) => {
          if (val.tags && val.tags.length > 0 && !isDisableTagSearch) {
            val.tags.forEach((i) => {
              if (i.tag_name.toLowerCase().includes(searchedCharachter))
                filteredCharaters.push(val);
            });
          }
          if (val.name.toLowerCase().includes(searchedCharachter)) {
            filteredCharaters.push(val);
          }
        });
        setCharaterList(filteredCharaters);
      } else {
        setCharaterList(data);
      }
    },
    [searchedCharachter]
  );

  useEffect(() => {
    if (
      selectedCharacterArray &&
      selectedCharacterArray.length > 0 &&
      selectedTags.includes("My Team")
    ) {
      let filteredCharaters: Character[] = [];
      data.forEach((val) => {
        if (selectedCharacterArray.find((i) => i.name === val.name)) {
          filteredCharaters.push(val);
        }
      });
      if (selectedTags.includes("My Team") && selectedTags.length > 1) {
        const existingFilteredCharaters = [...filteredCharaters];
        filteredCharaters = [];
        existingFilteredCharaters.forEach((val) => {
          if (val.tags && val.tags.length > 0) {
            val.tags.forEach((i) => {
              if (selectedTags.includes(i.tag_name.toLowerCase()))
                filteredCharaters.push(val);
            });
          }
        });
        const arrayWithNoDuplicates = Array.from(new Set(filteredCharaters));
        filteredCharaters = arrayWithNoDuplicates;
      }
      if (searchedCharachter !== "") {
        getFilteredCharacters(filteredCharaters, true);
      } else {
        setCharaterList(filteredCharaters);
      }
      return;
    }
    if (selectedTags.length > 0 && !selectedTags.includes("My Team")) {
      let filteredCharaters: Character[] = [];
      data.forEach((val) => {
        if (val.tags && val.tags.length > 0) {
          val.tags.forEach((i) => {
            if (selectedTags.includes(i.tag_name.toLowerCase()))
              filteredCharaters.push(val);
          });
        }
      });
      const arrayWithNoDuplicates = Array.from(new Set(filteredCharaters));
      filteredCharaters = arrayWithNoDuplicates;
      if (searchedCharachter !== "") {
        getFilteredCharacters(filteredCharaters, true);
      } else {
        setCharaterList(filteredCharaters);
      }
    } else {
      getFilteredCharacters(data, false);
    }
  }, [searchedCharachter, selectedTags, getFilteredCharacters, selectedCharacterArray]);
  return (
    <div>
      <table className="rootTable">
        <thead>
          <tr>
            <th>Characters</th>
            <th>Tags</th>
            <th>Power</th>
            <th>Mobility</th>
            <th>Technique</th>
            <th>Survivability</th>
            <th>Energy</th>
          </tr>
        </thead>
        <tbody>
          {characterList &&
            characterList.map((character) => {
              return (
                <CharacterListRow
                  isChecked={
                    !!selectedCharacterArray.find(
                      (i) => i.name === character.name
                    )
                  }
                  isDisabled={isDisabled}
                  handleSelectedChar={handleSelectedChar}
                  setRemoveCharacter={setRemoveCharacter}
                  id={character.id}
                  image={character.image}
                  name={character.name}
                  tags={character.tags}
                  abilities={character.abilities}
                  selectedCharacterArray={selectedCharacterArray}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterList;
