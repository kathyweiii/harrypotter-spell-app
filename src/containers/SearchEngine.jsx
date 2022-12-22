import React, { useEffect, useState } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { Form, TextArea, Button, Icon, Search } from "semantic-ui-react";
import Content from "../components/Content";
import RingLoader from "react-spinners/RingLoader";
const tf = require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");
// import { Form } from "react-router-dom";

export default function SearchEngine({ embeddingSpell, detailSpell }) {
  const [input, setInput] = useState("");
  const [embed, setEmbed] = useState(new Array(512).fill(0));
  const [ifSearch, setIfSearch] = useState(false);
  const [result, setResult] = useState([]);
  const [ifShow, setIfShow] = useState(false);
  const [ifLoad, setIfLoad] = useState(true);

  // 1. press search button
  const handleSearch = () => {
    setIfSearch(true);
    setIfShow(false);
    setIfLoad(true);
  };

  // 2. after press search button, start embedding
  const str2Arr = () => {
    use.load().then((model) => {
      model.embed(input).then((embeddings) => {
        setEmbed(Array.from(embeddings.dataSync()));
        setIfLoad(false);
      });
    });
  };

  // 3. after embedding, start calculating similarity
  var similarity = require("compute-cosine-similarity");

  const calculateSimilarity = async () => {
    var similar_spells_ls = [];

    var x = embed;
    var arr = []; // similarity between x and 303 embeddings

    for (var i = 0; i < embeddingSpell.length; i++) {
      arr.push(similarity(x, embeddingSpell[i].Embedding));
    }

    var n = 5; // 相關性最高的前n名
    var largestIndices = findNLargest(arr, n);
    for (var i = 0; i < n; i++) {
      similar_spells_ls.push(detailSpell[largestIndices[i]]);
    }
    return new Promise((resolve) => {
      resolve(similar_spells_ls);
    });
  };

  const findNLargest = (arr, n) => {
    // Deep Copy
    var tempArr = [];
    for (var i = 0; i < arr.length; i++) {
      tempArr.push(arr[i]);
    }
    tempArr.sort(function (a, b) {
      return b - a;
    });

    // Find Largest Values
    var largestValues = [];
    for (var i = 0; i < n; i++) {
      largestValues.push(tempArr[i]);
    }

    // Find Indices of Largest Values
    var largestIndices = [];
    for (var i = 0; i < n; i++) {
      largestIndices.push(arr.indexOf(largestValues[i]));
    }

    return largestIndices;
  };

  const showResult = () => {
    let div = <Content list={result}></Content>;
    return ifShow ? div : null;
  };

  const showLoading = () => {
    let div = (
      <RingLoader
        className="spinner"
        size={200}
        color={"#F37A24"}
        loading={!ifShow}
      />
    );
    return ifLoad ? div : null;
  };

  // const showText = () => {
  //   if (setIfLoad) return "Wait for it";
  //   else if (!setIfLoad) return "Enter Your Wish...";
  // };

  useEffect(() => str2Arr(), [ifSearch]);
  useEffect(() => {
    if (ifSearch) {
      const afterCal = async () => {
        await calculateSimilarity().then((result) => {
          setResult(result);
          setIfShow(true);
          setIfSearch(false);
        });
      };
      afterCal();
    }
  }, [embed]);

  return (
    <div className="search-engine">
      <div className="search-body">
        <div className="search-title"> Spell Search Engine </div>
        <div className="search-subtitle">
          ~ Say Your Wish To Find The Useful Spell ~
        </div>
        <div className="search-area">
          <Form>
            <Form.Field
              className="userInput"
              control={TextArea}
              placeholder="Enter Your Wish..."
              onChange={(e) => setInput(e.target.value)}
            ></Form.Field>
          </Form>
          <div>
            <Button size="large" onClick={handleSearch}>
              {/* <Icon name="search" inverted color="grey"> */}
              <Icon className="inverted search icon"></Icon>Search
            </Button>
          </div>
        </div>
      </div>
      <div className="result">
        {showLoading()}
        {showResult()}
      </div>
    </div>
  );
}
