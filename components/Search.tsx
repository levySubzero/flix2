import React from 'react';

interface InputProps {
  onChange: any;
  value: string;
}

const searchInput = {
  width: "100%",
  fontFamily: "sans-serif",
  fontSize: "16px",
  padding: "15px 45px 15px 15px",
  backgroundColor: "#eaeaeb",
  color: "#6c6c6c",
  borderRadius: "6px",
  border: "none",
  transition: "all .4s"
};

const searchBox = {
  width: "350px",
  display:" flex",
	bottom: "0",
	left: "0",
	right: "0",
	margin: "auto"
};

const searchBtn = {
  backgroundColor: "transparent",
  fontSize: "18px",
  padding: "6px 9px",
  marginLeft: "-45px",
  border: "none",
  color: "#6c6c6c",
  transition: "all .4s",
  zIndex: "10"
};

const Search: React.FC<InputProps> = ({ onChange, value }) => {
  return (
    <div className="relative">
      <div className="" style={searchBox}>
          <input className=""  style={searchInput} onChange={(e) => onChange(e.target.value)} value={value} type="text" placeholder="Search something.." />
          <button className="" style={searchBtn}><i className="fas fa-search"></i></button>
        </div>
    </div>
  )
}

export default Search