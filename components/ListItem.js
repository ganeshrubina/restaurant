import React from "react";
import {
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Right,
  Button,
  Icon
} from "native-base";
import PropTypes from "prop-types";
import { deleteFile } from "../hooks/APIHooks";

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";
const mediaURLRating = "http://media.mw.metropolia.fi/wbma/ratings/";

const ListItem = props => {
  return (
    <Card>
      <CardItem style={{ backgroundColor: "grey" }}>
        <Left>
          <Thumbnail
            style={{ width: 100, height: 100 }}
            square
            source={{ uri: mediaURL + props.singleMedia.thumbnails.w160 }}
          />
          <Body>
            <Text
              style={{ fontSize: 20, fontWeight: "bold" }}
              numberOfLines={1}
            >
              {props.singleMedia.title}
            </Text>
            <Text numberOfLines={3}>{props.singleMedia.description}</Text>
            <Text numberOfLines={2}>Comment:{props.singleMedia.comment}</Text>
          </Body>
        </Left>
        <Right>
          <Button
            primary
            onPress={() =>
              props.navigation.push("Single", { fileData: props.singleMedia })
            }
          >
            <Icon name="eye" />
          </Button>

          {props.mode === "myFiles" && (
            <>
              <Button
                warning
                onPress={() =>
                  props.navigation.push("Modify", {
                    fileData: props.singleMedia
                  })
                }
              >
                <Icon name="create" />
              </Button>
              <Button
                danger
                onPress={async () => {
                  const del = await deleteFile(props.singleMedia.file_id);
                  if (del.message) {
                    props.getMedia();
                  }
                }}
              >
                <Icon name="trash" />
              </Button>
            </>
          )}
        </Right>
      </CardItem>
    </Card>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  mode: PropTypes.string,
  getMedia: PropTypes.func
};

export default ListItem;
