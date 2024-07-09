

function Searchbar() {
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.search.value;
    console.log('Search query:', query);
    // Implement search functionality
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input 
        type="text" 
        name="Ask" 
        placeholder="How can I help you today? Type in your symptoms to get started..." 
        className="search-input"
      />
      <button type="submit" className="search-button">Ask</button>
    </form>
  );
}

export default Searchbar;