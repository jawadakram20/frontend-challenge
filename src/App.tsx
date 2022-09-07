import { useState } from "react";
import "./App.css";
import CharacterList from "./components/characterList";
import Header from "./components/header";
import SearchBar from "./components/searchCharacters";
import SelectedCharacter from "./components/selectedCharacter";
import Tags from "./components/Tags";

function App() {
  const [searchedCharachter, setSearchedCharacter] = useState("");
  const [selectedCharacterArray, setSelectedCharacterArray] = useState<any>([]);
  const [teamLength, setTeamLegnth] = useState<number>(0);
  const [selectedTags, setSelectedTag] = useState<string[]>([]);
  const selectedCharacter = (
    name: string,
    img: string,
    power: number,
    mobility: number,
    technique: number,
    survivability: number,
    energy: number
  ) => {
    const selectedArrayObject = {
      name,
      img,
      power,
      mobility,
      technique,
      survivability,
      energy,
    };
    const existingCharacters = [...selectedCharacterArray];
    existingCharacters.push(selectedArrayObject);
    setSelectedCharacterArray(existingCharacters);
  };
  const setRemoveCharacter = (name: string) => {
    const existingCharacters = [...selectedCharacterArray];
    existingCharacters.splice(
      existingCharacters.indexOf(
        existingCharacters.find((i) => i.name === name)
      ),
      1
    );
    setSelectedCharacterArray(existingCharacters);
  };
  const handleSelectedTag = (text: string) => {
    if (text === "Clear All") {
      setSelectedTag([]);
      return;
    }
    const selectTag = [...selectedTags];
    if (selectTag.includes(text)) {
      selectTag.splice(selectTag.indexOf(text), 1);
    } else {
      selectTag.push(text);
    }
    setSelectedTag(selectTag);
  };
  return (
    <div className="rootApp">
      <Header isCharactersSelected={selectedCharacterArray.length > 0} />
      <SelectedCharacter
        setRemoveCharacter={setRemoveCharacter}
        selectedCharacterArray={selectedCharacterArray}
        setTeamLegnth={setTeamLegnth}
      />
      <SearchBar
        searchedCharachter={searchedCharachter}
        setSearchedCharacter={setSearchedCharacter}
      />
      <Tags
        selectedTags={selectedTags}
        handleSelectedTag={handleSelectedTag}
      />
      <CharacterList
        selectedCharacterArray={selectedCharacterArray}
        selectedTags={selectedTags}
        teamLength={teamLength}
        searchedCharachter={searchedCharachter}
        handleSelectedChar={selectedCharacter}
        setRemoveCharacter={setRemoveCharacter}
      />
    </div>
  );
}

export default App;
