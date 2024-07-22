import React, { useEffect, useState } from 'react';

function ValueInput(item, SessionID){
  console.log(item.item.text)

  const [value, setValue] = useState('')
 
  const addSymptoms = async(value) => {
    var response = await axios.post('http://api.endlessmedical.com/v1/dx/UpdateFeature?SessionID=' + id + '&name=' + item.item.name + '&value=' + value)
    console.log(response)
  }
  return(
    <form>
      <h3>{item.item.laytext}</h3>
      {item.item.type == 'categorical' && 
      (<ul className="option-list">
        {item.item.choices.map((option, index) => (
          <li key={index} className="option-item"
          onClick={() => setValue(index + 1)}>
            {option.text}
          </li>
        ))}
      </ul>)}
      <button
      onClick={() => addSymptoms(value)}>Add symptoms</button>
    </form>
  )
}

export default ValueInput;