<%@ attribute name="name" required="true" %>
<%@ attribute name="regno" required="true" %>
<%@ attribute name="mark" required="true" %>

<div style="
    background:#eeeeee;
    padding:15px;
    margin-top:10px;
    border-radius:8px;
">

    <h4>Student Information</h4>

    Register Number: ${regno}
    <br><br>

    Student Name: ${name}
    <br><br>

    Mark: ${mark}

</div>