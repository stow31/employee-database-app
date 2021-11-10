import { useContext } from 'react';
import { EmployeeContext } from './EmployeeContext.js'
import './Traits.css'

function Traits(){
    const {
        traitsList,
        userTraits,
        setUserTraits
      } = useContext(EmployeeContext);

    const handleCheckBox = (e, trait) =>{ 
        const checked = e.target.checked

        if (checked) {
            setUserTraits([...userTraits, trait.id])
        } else {
            const idx = userTraits.indexOf(trait.id)
            if (idx > -1){
                setUserTraits( [...userTraits.slice(0,idx), ...userTraits.slice(idx+1)] )
            }
        }
    }

    return (
        <div>
            {traitsList ?
                traitsList.map(trait =>
                    <div 
                        key={trait.id} className="trait-container">
                        <input 
                        className="trait-checkbox" 
                        onClick={ (e) => handleCheckBox(e, trait)}
                        type="checkbox" label={trait.id}/>
                        <label>
                            <span>
                                <img className="icon-image" src={ require(`./assets/${trait.icon}`).default } />
                            </span>
                            {trait.trait}
                        </label>
                    </div>) :
                null
            }
        </div>
    )
}

export default Traits;