import React from "react";
import { SelectedCharatersProps } from "../../types";
import "./styles.css";
type CharacterListRowProps = {
  id: number;
  image: string;
  name: string;
  tags: {
    slot: number;
    tag_name: string;
  }[];
  abilities: {
    abilityName: string;
    abilityScore: number;
  }[];
  handleSelectedChar: (
    name: string,
    img: string,
    power: number,
    mobility: number,
    technique: number,
    survivability: number,
    energy: number
  ) => void;
  isDisabled: boolean;
  setRemoveCharacter: (name: string) => void;
  selectedCharacterArray: SelectedCharatersProps[];
  isChecked: boolean;
};

const CharacterListRow = ({
  isDisabled,
  id,
  image,
  name,
  tags,
  abilities,
  handleSelectedChar,
  setRemoveCharacter,
  isChecked,
}: CharacterListRowProps) => {
  const handleCheckBox = () => {
    if (!isChecked) {
      handleSelectedChar(
        name,
        image,
        abilities[0].abilityScore,
        abilities[1].abilityScore,
        abilities[2].abilityScore,
        abilities[3].abilityScore,
        abilities[4].abilityScore
      );
    } else {
      setRemoveCharacter(name);
    }
  };
  return (
    <tr key={id} className={isChecked ? "blueBackground" : ""}>
      <td className="imageColumn">
        <input
          type="checkbox"
          className="checkBox"
          onChange={handleCheckBox}
          disabled={isDisabled}
          checked={isChecked}
        />
        <div className="listImgBox">
          <img src={image} alt="not found" width="40px" height="40px" />
        </div>
        <span className="">{name}</span>
      </td>
      <td className="tagBox">
        {tags?.map((tag) => {
          return <span className="tags">{tag.tag_name}</span>;
        })}
      </td>
      <td className={abilities[0].abilityScore === 10 ? "textRed" : ""}>
        {abilities[0].abilityScore}
      </td>
      <td className={abilities[1].abilityScore === 10 ? "textRed" : ""}>
        {abilities[1].abilityScore}
      </td>
      <td className={abilities[2].abilityScore === 10 ? "textRed" : ""}>
        {abilities[2].abilityScore}
      </td>
      <td className={abilities[3].abilityScore === 10 ? "textRed" : ""}>
        {abilities[3].abilityScore}
      </td>
      <td className={abilities[4].abilityScore === 10 ? "textRed" : ""}>
        {abilities[4].abilityScore}
      </td>
    </tr>
  );
};

export default CharacterListRow;
