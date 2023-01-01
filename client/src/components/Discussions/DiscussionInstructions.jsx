import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import "../../index.css"

export default function DiscussionInstructions() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>

            <IconButton variant="outlined" onClick={handleClickOpen('paper')} style={{ marginLeft: "10px", width: "20px" }}>
                <ContactSupportIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" style={{ fontSize: "20px", fontWeight: 600 }}>About Discussion Forum</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <div className='isntContainer'>
                            <p className='instTitle'>What is Discussion Forum?</p>
                            <p className="instDetails">
                                The discussion forum is the place through which you can start a discussion on any subject or ask questions and obtain answers from our alumni.
                            </p>
                        </div>
                        <div className='isntContainer'>
                            <p className='instTitle'>How discussion forum works?</p>
                            <ol className="instDetails" style={{
                                listStyleType: "decimal",
                                marginLeft: "20px"
                            }}>
                                <li>Create a discussion.</li>
                                <li>Wait for the approval from admin.</li>
                                <li>Your conversation will be published in our forum once it has been approved, and the comment section will then be made available.</li>
                                <li>Now other alumni can able to comment on your discussion.</li>
                            </ol>
                        </div>

                        <div className='isntContainer'>
                            <p className='instTitle'>How comments section works?</p>
                            <ol className="instDetails" style={{
                                listStyleType: "decimal",
                                marginLeft: "20px"
                            }}>
                                <li>Write your comments about the discussion on the comment section.</li>
                                <li>By default the status of your discussion will be in approval. Once admin review your comment and approve your comments will be posted for that discussion.</li>
                            </ol>
                        </div>

                        <div className='isntContainer'>
                            <p className='instTitle'>Rules and Regulations</p>
                            <ol className="instDetails" style={{
                                listStyleType: "decimal",
                                marginLeft: "20px"
                            }}>
                                <li>Don’t use offensive words.</li>
                                <li>Criticise ideas, not people. Avoid offensive language (this includes profanity).</li>
                                <li> Keep your comments and discussion crisp and clear.</li>
                                <li>We will remove comments that are clearly commercial or otherwise resemble spam.</li>
                                <li>Be humble and happy to help others.</li>
                                <li>Don’t share your personal details in the comments (Phone number, Email, etc.,).</li>
                            </ol>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    {/* <Button onClick={handleClose}>Subscribe</Button> */}
                </DialogActions>
            </Dialog>
        </div >
    );
}