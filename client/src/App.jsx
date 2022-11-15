import { useEffect } from "react";
import { useState } from "react";

function App() {
    // default values of input fields
    const [form, setForm] = useState({
        dis_title: "",
        dis_description: "",
        dis_likes: "0",
    });

    // load all discussions

    const [allDiscussions, setAllDiscussions] = useState([]);

    useEffect(() => {
        loadDiscussions();
    }, []);

    async function loadDiscussions() {
        const discussions = await fetch("http://localhost:5050/discussion");
        const { data } = await discussions.json();
        setAllDiscussions(data);
    }

    // handle Input
    function handleInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // handle submit
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:5050/discussion", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            loadDiscussions();
        }
    }

    return (
        <div className="App">
            <form>
                <input
                    onChange={handleInput}
                    type="text"
                    placeholder="Discussion title"
                    name="dis_title"
                    value={form.dis_title}
                />
                <textarea
                    onChange={handleInput}
                    type="text"
                    placeholder="Discussion description"
                    name="dis_description"
                    value={form.dis_description}
                />

                <input
                    onChange={handleInput}
                    type="text"
                    value={form.dis_likes}
                    name="dis_likes"
                    hidden
                />
                <button onClick={handleSubmit} type="submit">
                    Create Discussion
                </button>
            </form>

            <table>
                {allDiscussions.map((discussion) => {
                    return (
                        <tr>
                            <td>{discussion.dis_title}</td>
                            <td>{discussion.dis_description}</td>
                            <td>{discussion.dis_likes}</td>
                            <td>{discussion.createdAt}</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
}

export default App;
