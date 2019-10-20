# View specification 

## Ojbectives 
Define a general concept of view and its relation with controller and models in single page application
Development will be based on react framework

*Examples or state of art links *

1- https://bixbydevelopers.com/dev/docs/dev-guide/developers/building-views.views#result-views
2- https://www.w3.org/TR/2018/WD-html53-20181018/sec-forms.html#form-associated-elements

## Associated elements
 - deletable elements 
 - expandble elements
 
 ## view could have owner 
 This means a view could be a sub-view of a parent component, vor instance on views.subviews api as form.element api ( )

- check event underground react doest not perfom something similar 

## view could have Attr interface 
This could be used to identified a target of event or set specified action 
https://dom.spec.whatwg.org/#attr
remplace namespaceURI current history object for instance
- localName is the name of the component 
- prefix => prefix should contained a list or parent order three 

 ## View witdh mathc
 use matching stragetigy will view need to display data base on some rule or event. 
 Consider that an user requests a service. At start, the view have to display a loader, on error occure then it display error message, if there are to many data, hence it ask to use to refine its research ... message could come form the model as message or data but we don't want multiply those if and so one in render, neither we can anticipate data objectt form and the view to render 

 // Several matching rule could apply and the corresponding layout/views will be assemble in tree order

 A view could a tree of elements/components of, however block a component to hold a view as 

 ## architecture

 - View will have a treeNodes to renders or a view to render 
 - TreeNodes or views to render by view could be organise in tree order (stacked as input, provide an escape so order could be change on runtime may be)
 - a list of views to developme https://doc.qt.io/qt-5/qheaderview.html#details
 https://doc.qt.io/qt-5/qabstractitemview.html

 # identify the controller to block a non-controller object to call directly model method 

 ##  Envisager les categories comme des facades au dessus du create component actuel comme dans redux pour donner des fonctionalites supplement

 ## a model should have a list of actions string list in three order if possible 

 Signals from the delegate are used during editing to tell the model and view about the state of the editor. => imply basicaly that model should be notify when rendering is successfully so delegate may send signal to model to let know to stop a batch job for instance

 ## developement a standard model as this to allow accessing arbibratry store data structure 
 https://doc.qt.io/qt-5/qstandarditemmodel.html
 https://lodash.com/docs#get
 a store is an object with at least one key when active 
 // if think proxify every object to avoid for instance on array  or number 
 https://doc.qt.io/qt-5/qstandarditemmodel.html
