import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        const activeItem = { ...this.state.activeItem, [name]: value };

        this.setState({ activeItem });
    };

    render() {
        const { toggle, onSave } = this.props

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}> fish </ModalHeader>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Label for="toe-sqaure">square</Label>
                      <Input
                        type="text"
                        id="toe-square"
                        name="square"
                        value={this.state.activeItem.square}
                        onChange={this.handleChange}
                        placeholder="Enter toe square"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="toe-move">move</Label>
                      <Input
                        type="text"
                        id="toe-move"
                        name="move"
                        value={this.state.activeItem.move}
                        onChange={this.handleChange}
                        placeholder="Enter toe move"
                      />
                    </FormGroup>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="success"
                    onClick={() => onSave(this.state.activeItem)}
                  >
                    Save
                  </Button>
                </ModalFooter>
            </Modal>
        );
    }
}