import axios from "axios";
import { useCallback, useEffect, useState } from "react";

type Props = {
  onOpenLevelUp: () => void;
  onClickPraise: () => void;
  onClickParty: () => void;
};

export const useLevelUp = (id: number) => {
  const [experience, setExperience] = useState(0);
  const [experienceRate, setExperienceRate] = useState(0);
  const [level, setLevel] = useState(0);
  const [levelUpFlag, setLevelUpFlag] = useState(false);
  const [title, setTitle] = useState("");
  const [levelComposition, setLevelComposition] = useState<Array<number>>([]);

  const decideTitle = (lv: number): string => {
    // 文字列をreturnする
    switch (true) {
      case lv < 7:
        return "村人A";

      case lv >= 7 && lv < 12:
        return "村の力自慢";

      case lv >= 12 && lv < 17:
        return "見習い兵士";

      case lv >= 17 && lv < 25:
        return "兵士";

      case lv >= 25 && lv < 36:
        return "騎士";

      case lv >= 36 && lv < 41:
        return "近衛騎士";

      case lv >= 41 && lv < 61:
        return "冒険者";

      case lv >= 61 && lv < 102:
        return "勇者";

      case lv >= 102 && lv < 200:
        return "伝説の勇者";

      case lv == 200:
        return "Messiah";

      default:
        return "村人A";
    }
  };

  // 次のレベルの必要経験値と、現在の取得経験値の割合を算出し、stateを更新
  const calcExperienceRate = (exp: number, nextlv: number) => {
    const rate = Math.floor((exp / nextlv) * 100);
    if (rate >= 100) {
      setExperienceRate(100);
      setLevelUpFlag(true);
    } else {
      setExperienceRate(rate);
    }
  };

  useEffect(() => {
    // 指数関数を用いた経験値の構成表の作成
    // インデックス0からレベル1
    const newComposition: Array<number> = [0];
    for (let level = 1; level < 200; level++) {
      const nextLevel = level + 1;
      const exponential = Math.round(3 + 2 * (nextLevel - 2) ** 1.7);
      newComposition.push(exponential);
    }
    setLevelComposition(newComposition);
    console.log(newComposition);

    axios
      .get(`http://localhost:4000/fetch/user/${id}`)
      .then((res) => {
        setLevel(res.data.level);

        const exp = res.data.total_time;
        setExperience(exp);

        // 第一引数: 総取得経験値 - 現在レベル必要総経験値 = 現在レベル到達以降取得経験値
        // 第二引数: 次回レベル必要総経験値 - 現在レベル必要総経験値 = 次回レベルまでの必要取得経験値
        calcExperienceRate(
          exp - newComposition[res.data.level - 1],
          newComposition[res.data.level] - newComposition[res.data.level - 1]
        );

        setTitle(res.data.title);
      })
      .catch((err) => {
        throw err;
      });
  }, [id]);

  const onClickLevelUp = useCallback(
    (props: Props) => {
      const { onOpenLevelUp, onClickPraise, onClickParty } = props;

      let base = 1;
      while (experience >= levelComposition[base]) {
        base++;
      }
      setLevel(base);
      axios
        .put(`http://localhost:4000/update/user/level/${id}`, { level: base })
        .then((res) => {
          setLevel(res.data.level);

          calcExperienceRate(
            experience - levelComposition[res.data.level - 1],
            levelComposition[res.data.level] -
              levelComposition[res.data.level - 1]
          );

          const newTitle = decideTitle(res.data.level);
          if (title !== newTitle) {
            axios.put(`http://localhost:4000/update/user/title/${id}`, {
              title: newTitle,
            });
            setTitle(newTitle);
          }
        });

      setLevelUpFlag(false);
      onOpenLevelUp();
      onClickPraise();
      onClickParty();
    },
    [id, experience, title]
  );

  return { experienceRate, level, levelUpFlag, title, onClickLevelUp };
};