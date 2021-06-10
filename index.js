//Precedence graph for /,*,+,- operators.
var precedence = new Array(4);
var s = "/1*1+2-2";
var h=0;
for (var i = 0; i < precedence.length; i++) {
    precedence[i] = new Array(2);
}
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 2; j++) {
 
        precedence[i][j] = s[h++];
    }
}
//using precedence graph to return precendence value
function precedenceOf(t){
    console.log("precedence called");
    var  token = t.charAt(0);
    for (var i=0; i < precedence.length; i++)
    {
        if (token == precedence[i][0])
        {
            return parseInt(precedence[i][1]+"");
        }
    }
    return -1;
}
// function to print operator position table
function generate_table_op(o){
    console.log("gen table called");
    var div = document.getElementById("operators");
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");
    var cell = document.createElement("th");
    var cellText = document.createTextNode("Operators");
    cell.appendChild(cellText);
    row.appendChild(cell);
    var cell = document.createElement("th");
    var cellText = document.createTextNode("Positions");
    cell.appendChild(cellText);
    row.appendChild(cell);
    tblBody.appendChild(row);

    for (var i = 0; i < o.length; i++) {
        if (typeof o[i][0] !== "undefined")
        {
        var row = document.createElement("tr");
    
        for (var j = 0; j < 2; j++) {

          var cell = document.createElement("td");
          var cellText = document.createTextNode(o[i][j]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
            tblBody.appendChild(row);
    }
      }
  tbl.appendChild(tblBody);
  div.appendChild(tbl);
  tbl.setAttribute("rules", "rows"); 

}
// function to print sorted operators table
function generate_table_op_sorted(o){
    console.log("gen sorted table called");
    var div = document.getElementById("sortedOperators");
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");
    var cell = document.createElement("th");
    var cellText = document.createTextNode("Operators");
    cell.appendChild(cellText);
    row.appendChild(cell);
    var cell = document.createElement("th");
    var cellText = document.createTextNode("SortedPositions");
    cell.appendChild(cellText);
    row.appendChild(cell);
    tblBody.appendChild(row);

    for (var i = 0; i < o.length; i++) {
        if (typeof o[i][0] !== "undefined")
        {
        var row = document.createElement("tr");
    
        for (var j = 0; j < 2; j++) {

          var cell = document.createElement("td");
          var cellText = document.createTextNode(o[i][j]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
            tblBody.appendChild(row);
    }
      }
  tbl.appendChild(tblBody);
  div.appendChild(tbl);
}

function Generate()
{
    console.log("gen called");
    var x = document.getElementById("rightbox");
        x.style.display = "flex";

    var i ;
    var j ; 
    var opc=0 ;
    var token;
    var temp;
    var operators = new Array(10);
    for (var i = 0; i < operators.length; i++) {
        operators[i] = new Array(2);
        }
    var expr = document.getElementById("textbox").value;
    var processed= new Array(expr.length);
    for (i=0; i < processed.length; i++)
		{
			processed[i] = false;
		}
    //looking for operatos and inserting them to operatos list with their positions
    for (i=0; i < expr.length; i++)
	{
		token = expr.charAt(i);
		for (j=0; j < precedence.length; j++)
		{
			if (token==precedence[j][0])
			{
				operators[opc][0] = token+"";
				operators[opc][1] = i+"";
				opc++;
				break;
			}
		}
	}
    generate_table_op(operators)
    //sorting operators according to their precedence
    for (i=opc-1; i >= 0; i--)
    {
        for (j=0; j < i; j++)
        {
            if (precedenceOf(operators[j][0]) > precedenceOf(operators[j+1][0]))
            {
                temp = operators[j][0];
                operators[j][0] = operators[j+1][0];
                operators[j+1][0] = temp;
                temp = operators[j][1];
                operators[j][1] = operators[j+1][1];
                operators[j+1][1] = temp;
            }				
        }
    }
    generate_table_op_sorted(operators)

    // printing the operands ny storing them into temperary variables
    for (i=0; i < opc; i++)
		{
			j = parseInt(operators[i][1]+"");
			var op1="";
            var op2="";
			if (processed[j-1]==true)
			{
				if (precedenceOf(operators[i-1][0]) == precedenceOf(operators[i][0]))
				{
					op1 = "t"+i;
				}
				else
				{
					for (var x=0; x < opc; x++)
					{
						if ((j-2) == parseInt(operators[x][1]))
						{
							op1 = "t"+(x+1)+"";
						}
					}
				}
			}else
			{
				op1 = expr.charAt(j-1)+"";
			}
			if (processed[j+1]==true)
			{
				for (var x=0; x < opc; x++)
				{
					if ((j+2) == parseInt(operators[x][1]))
					{
						op2 = "t"+(x+1)+"";
					}
				}
			}
			else
			{
				op2 = expr.charAt(j+1)+"";
			}
            var string= "<h3>t"+(i+1)+ " = "+op1+operators[i][0]+op2 +"</h3>"
            document.getElementById("codeGenerated").innerHTML +=string;
			processed[j] = processed[j-1] = processed[j+1] = true;
		}
        var string= "<h3>Return t"+(i)+"</h3>"
        document.getElementById("codeGenerated").innerHTML +=string;
        console.log("gen executed");
        

}
    
