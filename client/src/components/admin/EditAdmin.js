import { useState, useContext } from "react"
import { UserContext } from "../App"
//import Textarea 

export default function EditAdmin(){
    const { admin } = useContext(UserContext)

    const {about, social_links, resume} = admin.profile
    
    //TODO: edit public profile/admin in general, how to have two fetches? use same update value? or create new one fetch and update value? or create new component?

    const [aboutPage, setAboutPage] = useState(about)
    const [resumeUrl, setResumeUrl] = useState(resume)
    const [socialLinks, setSocialLinks] = useState(social_links)

    function handleAboutChange(e) {
       e.preventDefault();
        setAboutPage(e.target.value);
    }
    function handleResumeChange(e) {
       e.preventDefault();
        setResumeUrl(e.target.value);
    }
    function handleSocialChange(e) {
       e.preventDefault();
        setSocialLinks(e.target.value);
    }

    function onSubmit(e) {
        // const update = {
        // about: aboutPage,
        // social_links: socialLinks,
        // resume: resumePage
        // }
        // fetch("/profiles/:id", {
        // method: "PATCH",
        // 
        // })
    }

    return (
        // input form 
        ""
    )
}