import React from 'react'

const CharacterCard = ({image, name, status, species, gender, lastCardRef}) => {

    return (
        <div className='card-background' ref={lastCardRef}>
            <div className='card'>

                <div className='img-div'>
                    <img src={image} alt=''/>
                </div>

                <div className='attributes-div'>
                    
                    <div className="attribute">
                        Name: {name}
                    </div>
                    <div className="attribute">
                        Status: {status} <div className={status==='unknown'?'icon unknown':status==='Alive'?'icon alive':'icon dead'} ></div>
                    </div>
                    <div className="attribute">
                        Specie: {species}
                    </div>
                    <div className="attribute">
                        Gender: {gender}
                    </div>

                </div>
            </div>
        </div>

    )
}

export default CharacterCard

// name  status  species  gender  