import { useContext } from 'react';
import { EmployeeContext } from './EmployeeContext.js'
import './Traits.css'

function Traits(){

    const {traitsList} = useContext(EmployeeContext)

    return (
        <div>
            {traitsList ?
                traitsList.map(trait =>
                    <div 
                        key={trait.id} className="trait-container">
                        <input 
                        className="trait-checkbox" 
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