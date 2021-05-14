import React, {useState, useRef, useCallback, useEffect} from 'react'
import CharacterCard from "./CharacterCard"
import axios from 'axios'


function CharacterList() {

    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [characters, setCharacters] = useState([])
    const [hasMore, setHasMore] = useState(false)
  
    const observer = useRef()
    
    const lastCardRef = useCallback(node => {
        
        if(observer.current){
            observer.current.disconnect()
        } 

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPage(p => p+1)
            }
        })

        if(node){
            observer.current.observe(node)
        }

    },[hasMore])


    useEffect(() => {
        window.scrollTo(0,0)

        setLoading(true)

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        axios.get(`https://rickandmortyapi.com/api/character/`,{
            params: {name:query.toUpperCase()},
            cancelToken: source.token
        })
        .then(res => {
            setCharacters([])
            setCharacters([
                ...res.data.results
            ])
            setHasMore(res.data.info.next)
            setLoading(false)
        })
        .catch(() => {
            setCharacters([])
            setLoading(false)
        })

        return () => source.cancel('Operation canceled by the user.')

    },[query])

    useEffect(()=>{
        setLoading(true)

        if(page === 1){
            return
        }
        
        axios.get(`https://rickandmortyapi.com/api/character/`,{
            params: {name:query.toUpperCase(), page:page},
        })
        .then(res => {
            setCharacters(c => [...c, ...res.data.results])
            setHasMore(res.data.info.next)
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
        })
    },[page,query])

    const handleSearch = (e) => {
        setQuery(e.target.value)
        setPage(1)
    }


    return (
        <div className='background'>

            <div className="navbar">
                <input value={query} onChange={handleSearch} className="navbar-input" type="text" placeholder="Write any character's name"/>
            </div>
            
            <div className='character-list-background'>

                {
                    characters.map((obj, index) => {    
                        if(characters.length === index + 1){

                            return(
                                <CharacterCard
                                lastCardRef = {lastCardRef}
                                key={obj.id}
                                name={obj.name}
                                image={obj.image}
                                status={obj.status}
                                gender={obj.gender}
                                species={obj.species}/>
                            )

                        }
                        else{

                            return(
                                <CharacterCard
                                key={obj.id}
                                name={obj.name}
                                image={obj.image}
                                status={obj.status}
                                gender={obj.gender}
                                species={obj.species}/>
                            )

                        }                                                  

                    })
                }
            </div>
            {(characters.length === 0 && query.length > 0 && !loading) && <div className='notFound'>No results with {query}</div>}

        </div>

    )
}

export default CharacterList

