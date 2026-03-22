import { Link } from 'react-router-dom'
import "./compo.css"







const styles={
        nav:{
           display: "flex",
           justifyContent: "space-between",
           alignItems: "center",
           padding: "15px 40px",
           backgroundColor: "#111",
           color: "white",
         
           
           
           
         

        },
        logo:{
             margin: 0,
             
        },
        links:{
             display: "flex",
             gap: "20px"
        },
        link:{

            textDecoration: "none",
            color: "white",
            fontWeight: "bold" 

        },



    }

function Navbar() {

    
  return (
    <nav style={styles.nav} className='nav'>
        <h2 style={styles.logo}>🎓 Examify.Np </h2>
     <div style={styles.links}>
        <Link to="/" style={styles.link}> Home</Link>
        <Link to="/about" style={styles.link}> About</Link>
    </div>
    </nav>
    
  )
}

export default Navbar
