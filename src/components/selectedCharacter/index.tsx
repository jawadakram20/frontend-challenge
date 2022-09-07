import React, { useEffect, useState } from "react";
import { SelectedCharatersProps } from "../../types";
import "./styles.css";

type CharacterStrengthProps = {
  power: number;
  mobility: number;
  technique: number;
  survivability: number;
  energy: number;
};
export type SelectedCharacterProps = {
  selectedCharacterArray: SelectedCharatersProps[];
  setTeamLegnth: React.Dispatch<React.SetStateAction<number>>;
  setRemoveCharacter: (name: string) => void;
};

const SelectedCharacter = ({
  selectedCharacterArray,
  setTeamLegnth,
  setRemoveCharacter,
}: SelectedCharacterProps) => {
  const [details, setDetails] = useState<CharacterStrengthProps>({
    power: 0,
    energy: 0,
    technique: 0,
    mobility: 0,
    survivability: 0,
  });
  useEffect(() => {
    if (selectedCharacterArray && selectedCharacterArray.length > 0) {
      const teamPower = {
        power: 0,
        energy: 0,
        technique: 0,
        mobility: 0,
        survivability: 0,
      };
      selectedCharacterArray.forEach((val) => {
        teamPower.power = teamPower.power + val.power;
        teamPower.energy = teamPower.energy + val.energy;
        teamPower.technique = teamPower.technique + val.technique;
        teamPower.mobility = teamPower.mobility + val.mobility;
        teamPower.survivability = teamPower.survivability + val.survivability;
      });
      setDetails(teamPower);
    }
  }, [selectedCharacterArray]);
  setTeamLegnth(selectedCharacterArray.length);
  const handleRemoveCharacter = (name: string) => {
    setRemoveCharacter(name);
  };
  return (
    <div className="rootSelectedChar">
      {selectedCharacterArray && selectedCharacterArray.length > 0 && (
        <div style={{ display: "flex" }}>
          {selectedCharacterArray.map((val, index) => {
            return (
              <div
                className="selectedCharImg"
                onClick={() => handleRemoveCharacter(val.name)}
                key={index}
              >
                <div className="imgContain">
                <div className="middle">
                  <div className="text">Remove</div>
                </div>
                  <img
                    src={val.img}
                    alt="not found"
                    width="80px"
                    height="80px"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="averageScore">
        <div className="averageBox">
          <div>Power</div>
          <span>
            {selectedCharacterArray.length > 0
              ? (details.power / selectedCharacterArray.length).toFixed(2)
              : "-"}
          </span>
        </div>
        <div className="averageBox">
          <div>Mobility</div>
          <span>
            {selectedCharacterArray.length > 0
              ? (details.mobility / selectedCharacterArray.length).toFixed(2)
              : "-"}
          </span>
        </div>
        <div className="bar" />
        <div className="averageBox">
          <div>Technique</div>
          <span>
            {selectedCharacterArray.length > 0
              ? (details.technique / selectedCharacterArray.length).toFixed(2)
              : "-"}
          </span>
        </div>
        <div className="bar" />
        <div className="averageBox">
          <div>Survivability</div>
          <span>
            {selectedCharacterArray.length > 0
              ? (details.survivability / selectedCharacterArray.length).toFixed(
                  2
                )
              : "-"}
          </span>
        </div>
        <div className="averageBox">
          <div>Energy</div>
          <span>
            {selectedCharacterArray.length > 0
              ? (details.energy / selectedCharacterArray.length).toFixed(2)
              : "-"}
          </span>
        </div>
      </div>
      <div className="label">*Total as average for squad</div>
    </div>
  );
};

export default SelectedCharacter;
